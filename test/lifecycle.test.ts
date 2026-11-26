import { afterEach, describe, expect, it } from "vitest";
import extension from "../src/index";
import { APPEARANCE_DARK, SETTING_APPEARANCE, STYLE_ELEMENT_ID } from "../src/constants";
import type { OnloadArgs } from "../src/types";

function stubOnloadArgs(mode?: string): OnloadArgs {
  const store = new Map<string, unknown>();
  if (mode) store.set(SETTING_APPEARANCE, mode);
  return {
    extensionAPI: {
      settings: {
        get: (key) => store.get(key) ?? null,
        set: (key, value) => void store.set(key, value),
      },
    },
  };
}

afterEach(() => {
  extension.onunload();
  document.body.innerHTML = "";
});

describe("onload / onunload lifecycle", () => {
  it("onload injects the theme stylesheet once", () => {
    document.body.innerHTML = '<div class="rm-topbar"><span></span></div>';
    extension.onload(stubOnloadArgs());
    extension.onload(stubOnloadArgs());
    expect(document.querySelectorAll(`#${STYLE_ELEMENT_ID}`)).toHaveLength(1);
  });

  it("onunload after a Dark onload leaves no stylesheet and no appearance class", () => {
    document.body.innerHTML = '<div class="rm-topbar"><span></span></div>';
    extension.onload(stubOnloadArgs(APPEARANCE_DARK));
    expect(document.documentElement.classList.contains("bp3-dark")).toBe(true);

    extension.onunload();
    expect(document.getElementById(STYLE_ELEMENT_ID)).toBeNull();
    expect(document.documentElement.classList.contains("bp3-dark")).toBe(false);
    expect(document.documentElement.classList.contains("bp3-light")).toBe(false);
  });
});
