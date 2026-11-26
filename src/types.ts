/** A `select` setting in the extension's Roam Depot settings panel. */
export interface SelectSetting {
  id: string;
  name: string;
  description?: string;
  action: {
    type: "select";
    items: string[];
    /** Roam passes the selected item; the handler does not rely on the exact shape. */
    onChange?: (value: unknown) => void;
  };
}

/** A setting whose control is a React component (the grouped Roam Studio panel). */
export interface ReactComponentSetting {
  id: string;
  name: string;
  description?: string;
  action: {
    type: "reactComponent";
    component: () => unknown;
  };
}

export type PanelSetting = SelectSetting | ReactComponentSetting;

/** Minimal type for the Roam extension API settings subset we use. */
export interface ExtensionAPI {
  settings: {
    /** Roam returns what was stored: a string, a boolean, or null when nothing is. */
    get: (key: string) => unknown;
    /** Roam may store the value only after this returns (it returns a promise). */
    set: (key: string, value: unknown) => unknown;
    /** The Roam Depot settings panel; absent in tests that do not need it. */
    panel?: {
      create: (config: { tabTitle: string; settings: PanelSetting[] }) => void;
    };
  };
}
/** Argument Roam Depot passes to an extension's `onload` (subset we use). */
export interface OnloadArgs {
  extensionAPI: ExtensionAPI;
}
