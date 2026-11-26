/**
 * The settings store: Roam's extension settings, read through the schema, with
 * change notifications for the panel, the top-bar toggle and the appliers.
 *
 * Roam may store a value only after `settings.set` returns, so `get` right after a
 * `set` can still return the previous value. The store therefore keeps each value
 * it wrote until Roam returns it, and reads that first.
 */
import type { ExtensionAPI } from "../types";
import { readValue, settingByKey, type SettingValue } from "./schema";

export type Listener = (key: string) => void;

export class SettingsStore {
  private readonly written = new Map<string, unknown>();
  private readonly listeners = new Set<Listener>();

  constructor(private readonly api: ExtensionAPI) {}

  /** What is stored under a key (also keys outside the schema), `null` if nothing. */
  raw(key: string): unknown {
    if (this.written.has(key)) {
      const pending = this.written.get(key);
      const stored = this.api.settings.get(key) ?? null;
      if (stored === pending) this.written.delete(key);
      return pending;
    }
    return this.api.settings.get(key) ?? null;
  }

  /** A setting's effective value: a valid stored value, else its default. */
  get(key: string): SettingValue {
    const setting = settingByKey(key);
    if (!setting) throw new Error(`Unknown setting "${key}"`);
    return readValue(setting, this.raw(key));
  }

  /** Bound `get`, for code that takes a lookup function. */
  readonly lookup = (key: string): SettingValue => this.get(key);

  /** Stores a value (`null` clears it) and notifies the listeners. */
  set(key: string, value: unknown): void {
    const stored = value ?? null;
    this.written.set(key, stored);
    void this.api.settings.set(key, stored);
    this.notify(key);
  }

  /** Clears several settings, notifying once per key. */
  reset(keys: string[]): void {
    for (const key of keys) this.set(key, null);
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Tells the listeners that a key changed, also when it changed outside the store. */
  notify(key: string): void {
    for (const listener of [...this.listeners]) listener(key);
  }
}
