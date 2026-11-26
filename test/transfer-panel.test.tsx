import { act } from "react-dom/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import extension from "../src/index";
import { CSS_CLASS_ICON, STYLE_ELEMENT_ID } from "../src/constants";
import gruvbox from "../src/themes/gruvbox.css";
import { click, load, q, qa, setting } from "./helpers";

let current: ReturnType<typeof load> | null = null;
afterEach(() => {
  current?.unmount();
  current = null;
  extension.onunload();
  document.body.innerHTML = "";
  document.head.innerHTML = "";
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

const exportButton = () => q<HTMLButtonElement>(".roamstudio-transfer__export");
const menuItem = (label: string) => qa(".roamstudio-export-menu button").find((b) => b.textContent === label)!;
const openImport = () => click(q(".roamstudio-transfer__import"));
const dialog = () => document.querySelector<HTMLElement>(".roamstudio-import-dialog");
const summary = () => q(".roamstudio-import-dialog__summary").textContent;
const apply = () => q<HTMLButtonElement>(".roamstudio-import-dialog__apply");

/** Types text into the dialog's paste area, as React sees it. */
function paste(text: string) {
  const area = q<HTMLTextAreaElement>(".roamstudio-import-dialog__text");
  act(() => {
    const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!;
    setter.call(area, text);
    area.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

const doc = (settings: Record<string, unknown>) => JSON.stringify({ format: "roam-studio-settings", version: 1, settings });

describe("export and import controls", () => {
  it("sit above the first group", () => {
    current = load();
    const panel = q(".roamstudio-panel");
    expect(panel.firstElementChild?.classList.contains("roamstudio-transfer")).toBe(true);
    expect(qa(".roamstudio-transfer button").map((b) => b.textContent)).toEqual(["Export", "Import"]);
  });

  it("downloads the export as a dated JSON file", async () => {
    current = load({ "rs-theme": "Craft", "rs-page-link-color": "rose-600" });
    let blob: Blob | null = null;
    vi.stubGlobal("URL", { ...URL, createObjectURL: (b: Blob) => ((blob = b), "blob:x"), revokeObjectURL: () => {} });
    const clicked: HTMLAnchorElement[] = [];
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      clicked.push(this);
    });
    click(exportButton());
    click(menuItem("Download file"));
    expect(clicked).toHaveLength(1);
    expect(clicked[0].download).toMatch(/^roam-studio-settings-\d{4}-\d{2}-\d{2}\.json$/);
    expect(JSON.parse(await blob!.text())).toEqual({ format: "roam-studio-settings", version: 1, settings: { "rs-theme": "Craft", "rs-page-link-color": "rose-600" } });
    expect(document.querySelector("a[download]")).toBeNull();
  });

  it("copies the export to the clipboard and confirms it", async () => {
    current = load({ "rs-theme": "Things" });
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
    click(exportButton());
    await act(async () => menuItem("Copy to clipboard").click());
    expect(JSON.parse(writeText.mock.calls[0][0]).settings).toEqual({ "rs-theme": "Things" });
    expect(q(".roamstudio-transfer__notice").textContent).toContain("Copied");
  });

  it("says when copying fails, offers the download, and changes nothing", async () => {
    current = load({ "rs-theme": "Things" });
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } });
    const before = [...current.store.entries()];
    click(exportButton());
    await act(async () => menuItem("Copy to clipboard").click());
    expect(q(".roamstudio-transfer__notice--failed").textContent).toContain("failed");
    expect(q(".roamstudio-transfer__fallback").textContent).toBe("Download file instead");
    expect([...current.store.entries()]).toEqual(before);
  });

  it("opens the export choices from the keyboard and moves between them with the arrow keys", () => {
    current = load();
    click(exportButton());
    const items = qa(".roamstudio-export-menu button");
    expect(document.activeElement).toBe(items[0]);
    act(() => q(".roamstudio-export-menu").dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })));
    expect(document.activeElement).toBe(items[1]);
    act(() => q(".roamstudio-export-menu").dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })));
    expect(document.activeElement).toBe(items[0]);
  });
});

describe("import dialog", () => {
  it("summarizes a pasted export and lists skipped entries", () => {
    current = load({ "rs-tag-radius": "heavy", "rs-font-size": "l", "rs-module-done": true });
    openImport();
    paste(doc({ "rs-theme": "Things", "rs-appearance": "Dark", "rs-unknown": 1 }));
    expect(summary()).toContain("2 settings change, 3 settings go back to the default.");
    expect(qa(".roamstudio-import-dialog__skipped li").map((li) => li.textContent)).toEqual(["rs-unknown: not a Roam Studio setting"]);
    expect(apply().disabled).toBe(false);
  });

  it("reads a chosen file like pasted text", async () => {
    current = load({ "rs-tag-radius": "heavy" });
    openImport();
    const input = q<HTMLInputElement>(".roamstudio-import-dialog__file input[type=file]");
    const file = new File([doc({ "rs-theme": "Craft" })], "settings.json", { type: "application/json" });
    Object.defineProperty(input, "files", { value: [file] });
    await act(async () => {
      input.dispatchEvent(new Event("change", { bubbles: true }));
      await file.text();
    });
    expect(summary()).toContain("1 setting changes, 1 setting goes back to the default.");
  });

  it("rejects text that is not an export and offers no Apply", () => {
    current = load({ "rs-theme": "Craft" });
    openImport();
    paste("hello");
    expect(q(".roamstudio-import-dialog__error").textContent).toContain("not a Roam Studio settings export");
    expect(apply().disabled).toBe(true);
    expect(current.store.get("rs-theme")).toBe("Craft");
  });

  it("stores nothing when cancelled", () => {
    current = load({ "rs-theme": "Craft" });
    const before = [...current.store.entries()];
    openImport();
    paste(doc({ "rs-theme": "Things" }));
    click(q(".roamstudio-import-dialog__cancel"));
    expect(dialog()).toBeNull();
    expect([...current.store.entries()]).toEqual(before);
  });

  it("replaces the customization on Apply and the panel shows the imported values", () => {
    current = load({ "rs-tag-radius": "heavy", "rs-panel-open-groups": '["theme"]' });
    openImport();
    paste(doc({ "rs-theme": "Things" }));
    click(apply());
    expect(dialog()).toBeNull();
    expect([...current.store.entries()].sort()).toEqual([["rs-panel-open-groups", '["theme"]'], ["rs-theme", "Things"]]);
    expect(q<HTMLSelectElement>("select", setting("rs-theme")).value).toBe("Things");
    expect(q(".roamstudio-transfer__notice").textContent).toContain("imported");
  });

  it("applies theme and appearance at once, with the top-bar toggle", () => {
    current = load({ "rs-theme": "Quattro" });
    openImport();
    paste(doc({ "rs-theme": "Gruvbox", "rs-appearance": "Dark" }));
    click(apply());
    expect(document.getElementById(STYLE_ELEMENT_ID)?.textContent).toBe(gruvbox);
    expect(document.documentElement.classList.contains("bp3-dark")).toBe(true);
    expect(document.querySelector(`.${CSS_CLASS_ICON}`)?.classList.contains("bp3-icon-moon")).toBe(true);
  });
});
