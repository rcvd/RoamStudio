/**
 * Registers the Roam Studio settings panel in Roam Depot's settings tab: one
 * `reactComponent` row without a name, which the panel's stylesheet widens to the
 * full row (src/common/partials/_roamstudio-panel.scss).
 */
import React from "react";
import type { SettingsStore } from "../settings/store";
import type { ExtensionAPI } from "../types";
import { SettingsPanel } from "./panel";

export const PANEL_SETTING_ID = "rs-panel";

export function createSettingsPanel(extensionAPI: ExtensionAPI, store: SettingsStore) {
  extensionAPI.settings.panel?.create({
    tabTitle: "Roam Studio",
    settings: [
      {
        id: PANEL_SETTING_ID,
        name: "",
        description: "",
        action: { type: "reactComponent", component: () => <SettingsPanel store={store} /> },
      },
    ],
  });
}
