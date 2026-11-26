/**
 * The color picker (`color-selection`): a split swatch button (Light left, Dark
 * right) and a popover with "Theme default", "Theme accent" and every family at the
 * picker's seven shades. Hovering or focusing a swatch previews it on the group's
 * live samples; leaving the picker without choosing restores them; choosing stores
 * the color. A text color with a contrast below 4.5:1 against the theme's main
 * background is flagged, but still allowed.
 */
import React, { useState, type KeyboardEvent } from "react";
import { Button, Icon, Popover, Tooltip } from "@blueprintjs/core";
import { FAMILIES, PICKER_SHADES } from "../settings/colors";
import { ACCENT, colorCss, colorLabel, colorPair, formatColorChoice, parseColorChoice, type ColorChoice } from "../settings/color-value";
import type { ColorSetting } from "../settings/schema";
import type { SettingsStore } from "../settings/store";
import { contrastRatio, probe, type Pair } from "./probe";

/** Contrast below this, in Light or Dark, is flagged (WCAG AA for normal text). */
export const MIN_CONTRAST = 4.5;

const token = (setting: ColorSetting) => setting.target.tokens[0];

/** Text colors get a contrast warning; backgrounds and underlines do not. */
const isTextColor = (setting: ColorSetting) => !/(background|underline-color)$/.test(token(setting));

/** The Light and Dark colors a choice paints; `null` is the theme's default for the token. */
export function pairOf(choice: ColorChoice | null, tokenName: string): Pair | null {
  if (choice === null) return probe(tokenName, { ignoreSettings: true });
  if (choice === ACCENT) return probe("accent");
  return colorPair(choice);
}

/** Low-contrast warnings for a text color: e.g. ["Light 1.6:1"]. */
export function contrastWarnings(pair: Pair, background: Pair | null = probe("main-background")): string[] {
  if (!background) return [];
  const out: string[] = [];
  for (const mode of ["light", "dark"] as const) {
    const ratio = contrastRatio(pair[mode], background[mode]);
    if (ratio !== null && ratio < MIN_CONTRAST) out.push(`${mode === "light" ? "Light" : "Dark"} ${ratio.toFixed(1)}:1`);
  }
  return out;
}

/** Sets (or, with `null`, clears) a token on every live sample: the hover preview. */
export function previewOnSamples(tokenName: string, css: string | null): void {
  document.querySelectorAll<HTMLElement>(".roamstudio-sample").forEach((el) => {
    if (css === null) el.style.removeProperty(`--rs-${tokenName}`);
    else el.style.setProperty(`--rs-${tokenName}`, css);
  });
}

function Swatch({ pair, label, selected, onPick, onPreview }: { pair: Pair | null; label: string; selected: boolean; onPick: () => void; onPreview: () => void }) {
  return (
    <button
      type="button"
      className={`roamstudio-swatch${selected ? " roamstudio-swatch--selected" : ""}`}
      title={label}
      aria-label={label}
      aria-pressed={selected}
      onClick={onPick}
      onMouseEnter={onPreview}
      onFocus={onPreview}
    >
      <span className="roamstudio-swatch__light" style={{ background: pair?.light }} />
      <span className="roamstudio-swatch__dark" style={{ background: pair?.dark }} />
    </button>
  );
}

/** Arrow keys move focus between swatches: left/right within a row, up/down between rows. */
function moveFocus(event: KeyboardEvent<HTMLDivElement>) {
  const keys: Record<string, [number, number]> = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] };
  const step = keys[event.key];
  if (!step) return;
  const rows = [...event.currentTarget.querySelectorAll(".roamstudio-swatches__row")].map((r) => [...r.querySelectorAll<HTMLButtonElement>(".roamstudio-swatch")]);
  const r = rows.findIndex((row) => row.includes(document.activeElement as HTMLButtonElement));
  if (r < 0) return;
  const c = rows[r].indexOf(document.activeElement as HTMLButtonElement);
  const row = rows[Math.min(rows.length - 1, Math.max(0, r + step[0]))];
  row[Math.min(row.length - 1, Math.max(0, c + step[1]))]?.focus();
  event.preventDefault();
}

export function ColorControl({ setting, store }: { setting: ColorSetting; store: SettingsStore }) {
  const [open, setOpen] = useState(false);
  const name = token(setting);
  const choice = parseColorChoice(store.get(setting.key));
  const pair = pairOf(choice, name);
  // Only a color the user chose is flagged; the theme's own colors are the theme's call.
  const warnings = choice !== null && isTextColor(setting) && pair ? contrastWarnings(pair) : [];
  const label = choice ? colorLabel(choice) : "Theme default";

  // "Theme default" previews the theme's own colors, read with the settings switched off.
  const preview = (c: ColorChoice | null) => {
    const theme = c === null ? pairOf(null, name) : null;
    previewOnSamples(name, c === null ? (theme ? `light-dark(${theme.light}, ${theme.dark})` : null) : colorCss(c));
  };
  const pick = (c: ColorChoice | null) => {
    previewOnSamples(name, null);
    store.set(setting.key, c === null ? null : formatColorChoice(c));
    setOpen(false);
  };
  const interact = (next: boolean) => {
    if (!next) previewOnSamples(name, null); // closed without choosing: back to the stored color
    setOpen(next);
  };

  const content = (
    <div className="roamstudio-swatches" onKeyDown={moveFocus} onMouseLeave={() => previewOnSamples(name, null)}>
      <div className="roamstudio-swatches__row roamstudio-swatches__row--special">
        <Swatch pair={pairOf(null, name)} label="Theme default" selected={choice === null} onPick={() => pick(null)} onPreview={() => preview(null)} />
        <span className="roamstudio-swatches__name">Theme default</span>
        <Swatch pair={probe("accent")} label="Theme accent" selected={choice === ACCENT} onPick={() => pick(ACCENT)} onPreview={() => preview(ACCENT)} />
        <span className="roamstudio-swatches__name">Theme accent</span>
      </div>
      {FAMILIES.map((family) => (
        <div className="roamstudio-swatches__row" key={family}>
          <span className="roamstudio-swatches__family">{family}</span>
          {PICKER_SHADES.map((shade) => {
            const c = { family, shade };
            const selected = choice !== null && choice !== ACCENT && choice.family === family && choice.shade === shade;
            return <Swatch key={shade} pair={colorPair(c)} label={`${family} ${shade} (Dark: ${family} ${1000 - shade})`} selected={selected} onPick={() => pick(c)} onPreview={() => preview(c)} />;
          })}
        </div>
      ))}
    </div>
  );

  return (
    <span className="roamstudio-color">
      {warnings.length > 0 && (
        <Tooltip content={`Low contrast against the page background: ${warnings.join(", ")}`}>
          <Icon className="roamstudio-color__warning" icon="warning-sign" intent="warning" title={`Low contrast: ${warnings.join(", ")}`} />
        </Tooltip>
      )}
      <Popover content={content} position="bottom-right" isOpen={open} onInteraction={interact} popoverClassName="roamstudio-color-popover">
        <Button className="roamstudio-color__button" small rightIcon="caret-down" text={label} icon={<span className="roamstudio-swatch roamstudio-swatch--inline" aria-hidden="true"><span className="roamstudio-swatch__light" style={{ background: pair?.light }} /><span className="roamstudio-swatch__dark" style={{ background: pair?.dark }} /></span>} />
      </Popover>
    </span>
  );
}
