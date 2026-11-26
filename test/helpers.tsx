import React from "react";
import { act } from "react-dom/test-utils";
import { createRoot, type Root } from "react-dom/client";
import extension from "../src/index";
import { SETTINGS_STYLE_ID } from "../src/constants";
import type { ExtensionAPI, PanelSetting } from "../src/types";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/** Loads the extension with a stub API and renders its Roam Depot panel, as Depot would. */
export function load(stored: Record<string, unknown> = {}) {
  const store = new Map<string, unknown>(Object.entries(stored));
  let panel: PanelSetting[] = [];
  const api: ExtensionAPI = {
    settings: {
      get: (key) => store.get(key) ?? null,
      set: (key, value) => void (value === null ? store.delete(key) : store.set(key, value)),
      panel: { create: (config) => void (panel = config.settings) },
    },
  };
  document.body.innerHTML = '<div class="rm-topbar"><span></span></div><div id="depot"></div>';
  extension.onload({ extensionAPI: api });
  const host = document.getElementById("depot")!;
  let root: Root;
  // Renders into whatever element has id "depot" now (a test may rebuild Depot's row).
  const render = () => {
    const action = panel[0].action;
    if (action.type !== "reactComponent") throw new Error("expected a reactComponent");
    const Component = action.component as () => React.ReactElement;
    act(() => {
      root = createRoot(document.getElementById("depot")!);
      root.render(<Component />);
    });
  };
  render();
  const unmount = () => act(() => root.unmount());
  return { store, panel, host, render, unmount };
}



export const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel)!;
export const qa = (sel: string, root: ParentNode = document) => [...root.querySelectorAll<HTMLElement>(sel)];
export const group = (id: string) => q(`[data-group="${id}"]`);
export const header = (id: string) => q<HTMLButtonElement>(".roamstudio-group__toggle", group(id));
export const click = (el: Element) => act(() => (el as HTMLElement).click());
export const change = (el: HTMLSelectElement, value: string) =>
  act(() => {
    el.value = value;
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });
export const settingsCss = () => document.getElementById(SETTINGS_STYLE_ID)?.textContent ?? "";
export const setting = (key: string) => q(`[data-setting="${key}"]`);
/** Chooses a theme in the panel's Theme & Appearance group. */
export const chooseTheme = (theme: string) => change(q<HTMLSelectElement>("select", setting("rs-theme")), theme);
/** Clicks one option of a segmented control. */
export const chooseSegment = (key: string, label: string) => click(qa("button", setting(key)).find((b) => b.textContent === label)!);
