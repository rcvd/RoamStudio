import { act } from "react-dom/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import extension from "../src/index";
import { CSS_CLASS_ICON } from "../src/constants";
import { contrastWarnings } from "../src/panel/color";
import { change, chooseTheme, click, group, header, load, q, qa, setting, settingsCss } from "./helpers";

let current: ReturnType<typeof load> | null = null;
beforeEach(() => {
  current = null;
});
afterEach(() => {
  current?.unmount();
  extension.onunload();
  document.body.innerHTML = "";
  document.head.innerHTML = "";
  vi.restoreAllMocks();
});

describe("settings panel", () => {
  it("is one reactComponent row in a tab titled Roam Studio", () => {
    current = load();
    expect(current.panel).toHaveLength(1);
    expect(current.panel[0].action.type).toBe("reactComponent");
  });

  it("lists the groups in order, with Theme & Appearance open and every other group closed", () => {
    current = load();
    expect(qa(".roamstudio-group__toggle").map((b) => b.textContent)).toEqual([
      "Theme & Appearance", "Typography", "Headings", "Code", "Links", "Tags", "Dates", "Sidebars & Top Bar", "Blocks & Content", "Mobile", "Performance",
    ]);
    expect(qa(".roamstudio-group__toggle").map((b) => b.getAttribute("aria-expanded"))).toEqual(["true", ...Array(10).fill("false")]);
    expect(qa(".roamstudio-group__body")).toHaveLength(1);
  });

  it("opens and closes a group from its header, a focusable button", () => {
    current = load();
    expect(header("links").tagName).toBe("BUTTON");
    click(header("links"));
    expect(q(".roamstudio-group__body", group("links"))).not.toBeNull();
    expect(qa(".roamstudio-section__title", group("links")).map((h) => h.textContent)).toEqual(["Page links", "External links", "Reference links", "Block references"]);
    click(header("links"));
    expect(q(".roamstudio-group__body", group("links"))).toBeNull();
  });

  it("remembers the open groups when the panel is opened again", () => {
    current = load();
    click(header("tags"));
    click(header("dates"));
    click(header("theme"));
    current.unmount();
    current.render();
    expect(qa(".roamstudio-group--open").map((g) => g.dataset.group)).toEqual(["tags", "dates"]);
    expect(JSON.parse(current.store.get("rs-panel-open-groups") as string)).toEqual(["tags", "dates"]);
  });

  it("counts the customized settings of a group, also while it is closed", () => {
    current = load({ "rs-page-link-color": "rose-600", "rs-external-link-weight": "bold" });
    expect(q(".roamstudio-group__count", group("links")).textContent).toBe("2");
    expect(group("tags").querySelector(".roamstudio-group__count")).toBeNull();
  });

  it("resets a group: theme defaults, stored values cleared, applied at once", () => {
    current = load({ "rs-tag-color": "rose-600", "rs-tag-padding": "large", "rs-tag-radius": "heavy", "rs-page-link-color": "rose-600" });
    expect(settingsCss()).toContain("--rs-tag-radius");
    click(q(".roamstudio-group__reset", group("tags")));
    for (const key of ["rs-tag-color", "rs-tag-padding", "rs-tag-radius"]) expect(current.store.has(key)).toBe(false);
    expect(settingsCss()).not.toContain("--rs-tag");
    expect(settingsCss()).toContain("--rs-page-link-color");
    click(header("tags"));
    expect(q<HTMLSelectElement>("select", setting("rs-tag-padding")).value).toBe("");
    expect(q("option[value='']", setting("rs-tag-padding")).textContent).toBe("Theme default");
  });

  it("shows the Gruvbox contrast only while Gruvbox is selected, without remounting", () => {
    current = load();
    expect(document.querySelector('[data-setting="rs-gruvbox-contrast"]')).toBeNull();
    change(q<HTMLSelectElement>("select", setting("rs-theme")), "Gruvbox");
    expect(setting("rs-gruvbox-contrast")).not.toBeNull();
    change(q<HTMLSelectElement>("select", setting("rs-theme")), "Blueprint");
    expect(document.querySelector('[data-setting="rs-gruvbox-contrast"]')).toBeNull();
  });

  it("switches Phosphor's weight with the theme, without a reload", () => {
    current = load({ "rs-icon-theme": "phosphor", "rs-theme": "Quattro" });
    const sheets = () => [...document.querySelectorAll('style[id^="roamstudio-module-icons-"]')].map((e) => e.id);
    expect(sheets()).toEqual(["roamstudio-module-icons-phosphor-light"]);
    change(q<HTMLSelectElement>("select", setting("rs-theme")), "Gruvbox");
    expect(sheets()).toEqual(["roamstudio-module-icons-phosphor-regular"]);
  });

  it("hides a link's underline color while its underline style is none", () => {
    current = load();
    click(header("links"));
    expect(setting("rs-external-link-underline-color")).not.toBeNull();
    change(q<HTMLSelectElement>("select", setting("rs-external-link-underline")), "none");
    expect(document.querySelector('[data-setting="rs-external-link-underline-color"]')).toBeNull();
  });

  it("keeps a custom link color through a theme switch, while defaults follow the theme", () => {
    current = load({ "rs-page-link-color": "violet-600" });
    const before = settingsCss();
    chooseTheme("Gruvbox");
    expect(document.getElementById("roamstudio-theme")?.textContent).toContain("--gruvbox-bg-dark");
    expect(settingsCss()).toBe(before);
    expect(settingsCss()).not.toContain("--rs-tag");
  });

  it("applies a change at once", () => {
    current = load();
    click(header("typography"));
    change(q<HTMLSelectElement>("select", setting("rs-font-size")), "l");
    expect(settingsCss()).toContain("--rs-font-size: 16px;");
    expect(current.store.get("rs-font-size")).toBe("l");
  });

  it("previews each font in its own font", () => {
    current = load();
    click(header("typography"));
    click(q(".roamstudio-font-button", setting("rs-font-main")));
    const items = qa(".roamstudio-font-menu [role=menuitem]");
    expect(items[0].textContent).toBe("Theme default");
    expect(items.find((i) => i.textContent === "Lato")!.style.fontFamily).toContain("Lato");
    click(items.find((i) => i.textContent === "Lato")!);
    expect(settingsCss()).toContain("--rs-font-main: Lato, sans-serif;");
    expect(document.getElementById("roamstudio-fonts")?.textContent).toContain('font-family: "Lato"');
  });

  it("switches modules from their group", () => {
    current = load();
    click(header("sidebars"));
    act(() => q<HTMLInputElement>("input[type=checkbox]", setting("rs-module-masonry")).click());
    expect(document.getElementById("roamstudio-module-masonry")).not.toBeNull();
  });

  it("keeps the panel and the top-bar toggle in sync", () => {
    current = load();
    click(qa("button", setting("rs-appearance")).find((b) => b.textContent === "Light")!);
    expect(document.documentElement.classList.contains("bp3-light")).toBe(true);
    expect(q(`.${CSS_CLASS_ICON}`).classList.contains("bp3-icon-flash")).toBe(true);
    click(q(`.${CSS_CLASS_ICON}`).parentElement!); // Light → Auto
    click(q(`.${CSS_CLASS_ICON}`).parentElement!); // Auto → Dark
    const active = qa("button", setting("rs-appearance")).filter((b) => b.classList.contains("bp3-active"));
    expect(active.map((b) => b.textContent)).toEqual(["Dark"]);
  });

  it("widens its Depot row and leaves Roam's markup as it was on unmount", () => {
    document.body.innerHTML = "";
    current = load();
    // Rebuild Depot's row structure around the panel, as Roam renders it.
    current.unmount();
    current.host.outerHTML = '<section class="rm-settings-panel__section flex-h-box"><div><h4></h4><span class="rm-settings-panel__description"></span></div><div id="depot"></div></section>';
    current.render();
    const row = q("section.rm-settings-panel__section");
    expect(row.classList.contains("roamstudio-panel-row")).toBe(true);
    expect(row.children[0].classList.contains("roamstudio-panel-label")).toBe(true);
    expect(row.children[1].classList.contains("roamstudio-panel-host")).toBe(true);
    current.unmount();
    expect(q("section.rm-settings-panel__section").className).toBe("rm-settings-panel__section flex-h-box");
    current.render();
  });
});

describe("color picker", () => {
  const swatches = () => qa(".roamstudio-color-popover .roamstudio-swatch");
  const openPicker = (key: string) => click(q(".roamstudio-color__button", setting(key)));

  it("offers Theme default, Theme accent and every family at seven shades", () => {
    current = load();
    click(header("links"));
    openPicker("rs-page-link-color");
    expect(qa(".roamstudio-swatches__name").map((n) => n.textContent)).toEqual(["Theme default", "Theme accent"]);
    expect(qa(".roamstudio-swatches__family")).toHaveLength(18);
    expect(swatches()).toHaveLength(2 + 18 * 7);
    expect(swatches()[2].getAttribute("aria-label")).toBe("rose 100 (Dark: rose 900)");
  });

  it("previews a hovered swatch on the samples and restores them on Escape, storing nothing", () => {
    current = load();
    click(header("links"));
    openPicker("rs-page-link-color");
    const violet = swatches().find((s) => s.getAttribute("aria-label")?.startsWith("violet 600"))!;
    act(() => violet.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })));
    const samples = qa(".roamstudio-sample");
    expect(samples).toHaveLength(2);
    for (const s of samples) expect(s.style.getPropertyValue("--rs-page-link-color")).toBe("light-dark(#7c3aed, #a78bfa)");
    act(() => violet.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })));
    for (const s of samples) expect(s.style.getPropertyValue("--rs-page-link-color")).toBe("");
    expect(current.store.has("rs-page-link-color")).toBe(false);
  });

  it("stores and applies a chosen color, and labels the button with it", () => {
    current = load();
    click(header("headings"));
    openPicker("rs-h1-color");
    click(swatches().find((s) => s.getAttribute("aria-label")?.startsWith("emerald 800"))!);
    expect(current.store.get("rs-h1-color")).toBe("emerald-800");
    expect(settingsCss()).toContain("--rs-h1-color: light-dark(#065f46, #a7f3d0);");
    const button = q(".roamstudio-color__button", setting("rs-h1-color"));
    expect(button.textContent).toBe("emerald 800");
    expect(qa(".roamstudio-swatch__light, .roamstudio-swatch__dark", button).map((s) => s.style.background)).toEqual(["rgb(6, 95, 70)", "rgb(167, 243, 208)"]);
  });

  it("shows the theme's actual default and accent in Light and Dark", () => {
    // jsdom does not compute the theme's CSS: stub what the probes read.
    const real = window.getComputedStyle;
    vi.spyOn(window, "getComputedStyle").mockImplementation((el: Element, pseudo?: string | null) => {
      const style = real(el, pseudo);
      const wrapper = el.closest(".roamstudio-probe > div");
      if (!wrapper) return style;
      const dark = wrapper.classList.contains("bp3-dark");
      return { ...style, getPropertyValue: () => (dark ? "rgb(138, 155, 168)" : "rgb(92, 112, 128)") } as CSSStyleDeclaration;
    });
    current = load();
    click(header("tags"));
    openPicker("rs-tag-color");
    const themeDefault = swatches()[0];
    expect(themeDefault.getAttribute("aria-label")).toBe("Theme default");
    expect(qa("span", themeDefault).map((s) => s.style.background)).toEqual(["rgb(92, 112, 128)", "rgb(138, 155, 168)"]);
  });

  it("flags low contrast against the main background, per mode, and still applies the color", () => {
    const background = { light: "rgb(245, 248, 250)", dark: "rgb(32, 43, 51)" };
    expect(contrastWarnings({ light: "#fef08a", dark: "#854d0e" }, background)).toEqual(["Light 1.1:1", "Dark 2.1:1"]);
    expect(contrastWarnings({ light: "#eab308", dark: "#eab308" }, background)).toEqual(["Light 1.8:1"]);
    expect(contrastWarnings({ light: "#9f1239", dark: "#fecdd3" }, background)).toEqual([]);
    current = load({ "rs-page-link-color": "yellow-500" });
    expect(settingsCss()).toContain("--rs-page-link-color: #eab308;");
  });
});

describe("contrast warning", () => {
  it("is shown for a chosen color only, not for the theme's default", () => {
    const real = window.getComputedStyle;
    vi.spyOn(window, "getComputedStyle").mockImplementation((el: Element, pseudo?: string | null) => {
      const style = real(el, pseudo);
      const wrapper = el.closest(".roamstudio-probe > div");
      if (!wrapper) return style;
      const dark = wrapper.classList.contains("bp3-dark");
      // Main background and the theme's (low-contrast) tag color.
      const value = el.getAttribute("style")?.includes("main-background") ? (dark ? "rgb(32, 43, 51)" : "rgb(245, 248, 250)") : "rgb(138, 155, 168)";
      return { ...style, getPropertyValue: () => value } as CSSStyleDeclaration;
    });
    current = load({ "rs-page-link-color": "yellow-500" });
    click(header("tags"));
    click(header("links"));
    expect(setting("rs-tag-color").querySelector(".roamstudio-color__warning")).toBeNull();
    expect(setting("rs-page-link-color").querySelector(".roamstudio-color__warning")?.getAttribute("title")).toBe("Low contrast: Light 1.8:1");
  });
});
