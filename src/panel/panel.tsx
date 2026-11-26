/**
 * The Roam Studio settings panel: every setting of settings/schema.ts in collapsible
 * groups, rendered in Roam Depot's settings tab as one `reactComponent` row. It uses
 * Roam's own React and BlueprintJS 3 (webpack externals) and Roam's settings classes,
 * so the active theme styles it in every appearance mode.
 *
 * Every change goes to the settings store; the extension's store listener applies it
 * to the page at once (index.ts). The panel re-renders on every store change, so the
 * top-bar toggle and the panel always show the same values.
 */
import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Collapse, HTMLSelect, Menu, MenuItem, Popover, Switch, Tag } from "@blueprintjs/core";
import { SETTING_OPEN_GROUPS } from "../constants";
import { GROUPS, isDefault, type ChoiceSetting, type Group, type Setting } from "../settings/schema";
import type { SettingsStore } from "../settings/store";
import { ColorControl } from "./color";
import { GroupSample } from "./sample";
import { TransferRow } from "./transfer";

const THEME_DEFAULT = "Theme default";
const DEFAULT_OPEN = ["theme"];

/** Re-renders the calling component on every store change. */
function useStoreVersion(store: SettingsStore): number {
  const [version, setVersion] = useState(0);
  useEffect(() => store.subscribe(() => setVersion((v) => v + 1)), [store]);
  return version;
}

/** The ids of the open groups, stored as a JSON list. */
export function openGroups(store: SettingsStore): string[] {
  const raw = store.raw(SETTING_OPEN_GROUPS);
  if (typeof raw !== "string") return DEFAULT_OPEN;
  try {
    const list: unknown = JSON.parse(raw);
    return Array.isArray(list) && list.every((x) => typeof x === "string") ? list : DEFAULT_OPEN;
  } catch {
    return DEFAULT_OPEN;
  }
}

const settingsOf = (group: Group): Setting[] => group.sections.flatMap((s) => s.settings);

/** How many of a group's settings differ from their defaults. */
export const customizedCount = (group: Group, store: SettingsStore): number =>
  settingsOf(group).filter((s) => !isDefault(s, store.get(s.key))).length;

/**
 * Widens the panel's Roam Depot row: marks the row, the child that holds the panel
 * and the other (empty name and description) children with classes the panel's
 * stylesheet uses, and removes them again on unmount.
 */
function useFullWidthRow(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const panel = ref.current;
    const row = panel?.closest(".rm-settings-panel__section");
    if (!panel || !row) return;
    const marked: [Element, string][] = [[row, "roamstudio-panel-row"]];
    for (const child of row.children) marked.push([child, child.contains(panel) ? "roamstudio-panel-host" : "roamstudio-panel-label"]);
    for (const [el, cls] of marked) el.classList.add(cls);
    return () => {
      for (const [el, cls] of marked) el.classList.remove(cls);
    };
  }, [ref]);
}

export function SettingsPanel({ store }: { store: SettingsStore }) {
  useStoreVersion(store);
  const ref = useRef<HTMLDivElement>(null);
  useFullWidthRow(ref);
  const open = openGroups(store);
  const toggle = (id: string) => {
    const next = open.includes(id) ? open.filter((g) => g !== id) : [...open, id];
    store.set(SETTING_OPEN_GROUPS, JSON.stringify(next));
  };
  return (
    <div className="roamstudio-panel" ref={ref}>
      <TransferRow store={store} />
      {GROUPS.map((group) => (
        <GroupView key={group.id} group={group} store={store} isOpen={open.includes(group.id)} onToggle={() => toggle(group.id)} />
      ))}
    </div>
  );
}

function GroupView({ group, store, isOpen, onToggle }: { group: Group; store: SettingsStore; isOpen: boolean; onToggle: () => void }) {
  const count = customizedCount(group, store);
  const reset = () => store.reset(settingsOf(group).map((s) => s.key));
  return (
    <div className={`roamstudio-group${isOpen ? " roamstudio-group--open" : ""}`} data-group={group.id}>
      <div className="roamstudio-group__header">
        <Button
          className="roamstudio-group__toggle"
          minimal
          fill
          alignText="left"
          icon={isOpen ? "chevron-down" : "chevron-right"}
          text={group.title}
          aria-expanded={isOpen}
          onClick={onToggle}
        />
        {count > 0 && (
          <Tag className="roamstudio-group__count" minimal round title={`${count} customized`}>
            {count}
          </Tag>
        )}
        <Button className="roamstudio-group__reset" minimal small text="Reset" title={`Reset ${group.title} to the defaults`} disabled={count === 0} onClick={reset} />
      </div>
      <Collapse isOpen={isOpen}>
        <div className="roamstudio-group__body">
          {group.sections.map((section, i) => (
            <div className="roamstudio-section" key={section.title ?? i}>
              {section.title && <h6 className="bp3-heading roamstudio-section__title">{section.title}</h6>}
              {section.settings
                .filter((s) => s.visible?.(store.lookup) ?? true)
                .map((s) => (
                  <SettingRow key={s.key} setting={s} store={store} />
                ))}
            </div>
          ))}
          <GroupSample group={group} store={store} />
        </div>
      </Collapse>
    </div>
  );
}

function SettingRow({ setting, store }: { setting: Setting; store: SettingsStore }) {
  return (
    <div className="roamstudio-setting" data-setting={setting.key}>
      <div className="roamstudio-setting__text">
        <div className="roamstudio-setting__label">{setting.label}</div>
        <div className="roamstudio-setting__description bp3-text-muted">{setting.description}</div>
      </div>
      <div className="roamstudio-setting__control">
        <Control setting={setting} store={store} />
      </div>
    </div>
  );
}

function Control({ setting, store }: { setting: Setting; store: SettingsStore }) {
  const value = store.get(setting.key);
  if (setting.control === "switch") {
    return <Switch className="roamstudio-switch" checked={value === true} alignIndicator="right" onChange={(e) => store.set(setting.key, e.currentTarget.checked)} />;
  }
  if (setting.control === "color") return <ColorControl setting={setting} store={store} />;
  if (setting.control === "segmented") return <Segmented setting={setting} value={value as string | null} store={store} />;
  if (setting.control === "font") return <FontMenu setting={setting} value={value as string | null} store={store} />;
  const options = [...(setting.themeDefault ? [{ value: "", label: THEME_DEFAULT }] : []), ...setting.options.map((o) => ({ value: o.value, label: o.label }))];
  return (
    <HTMLSelect
      className="roamstudio-select"
      value={typeof value === "string" ? value : ""}
      options={options}
      onChange={(e) => store.set(setting.key, e.currentTarget.value || null)}
    />
  );
}

function Segmented({ setting, value, store }: { setting: ChoiceSetting; value: string | null; store: SettingsStore }) {
  return (
    <ButtonGroup className="roamstudio-segmented">
      {setting.options.map((o) => (
        <Button key={o.value} small text={o.label} active={value === o.value} aria-pressed={value === o.value} onClick={() => store.set(setting.key, o.value)} />
      ))}
    </ButtonGroup>
  );
}

/** A font choice: a menu whose items show each font in that font. */
function FontMenu({ setting, value, store }: { setting: ChoiceSetting; value: string | null; store: SettingsStore }) {
  const [open, setOpen] = useState(false);
  const current = setting.options.find((o) => o.value === value);
  const choose = (v: string | null) => {
    store.set(setting.key, v);
    setOpen(false);
  };
  const menu = (
    <Menu className="roamstudio-font-menu">
      <MenuItem text={THEME_DEFAULT} active={!current} onClick={() => choose(null)} />
      {setting.options.map((o) => (
        <MenuItem key={o.value} text={o.label} style={{ fontFamily: o.css }} active={current?.value === o.value} onClick={() => choose(o.value)} />
      ))}
    </Menu>
  );
  return (
    <Popover content={menu} position="bottom-left" minimal isOpen={open} onInteraction={setOpen}>
      <Button className="roamstudio-font-button" small rightIcon="caret-down" style={current ? { fontFamily: current.css } : undefined} text={current?.label ?? THEME_DEFAULT} />
    </Popover>
  );
}
