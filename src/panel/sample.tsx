/**
 * Live samples (`color-selection`): the Headings, Links, Tags and Dates groups show
 * the elements they style, with Roam's markup, once in a `.bp3-light` and once in a
 * `.bp3-dark` wrapper. The active theme and the settings style them like the page;
 * the color picker's hover preview sets a token inline on the wrappers.
 */
import React from "react";
import type { Group } from "../settings/schema";
import type { SettingsStore } from "../settings/store";

function SampleBody({ group }: { group: Group }) {
  switch (group.id) {
    case "headings":
      return (
        <>
          {[1, 2, 3].map((n) => (
            <div key={n} className={`rm-block rm-heading-level-${n}`}>
              <div className="rm-block__self">
                <div className="rm-block__input roam-block">Heading {n}</div>
              </div>
            </div>
          ))}
        </>
      );
    case "links":
      return (
        <div className="roam-block">
          A <span data-link-uid="sample"><span className="rm-page-ref rm-page-ref--link">page link</span></span>, an <a className="rm-alias rm-alias--external">external link</a>, a{" "}
          <a className="rm-alias rm-alias--page">reference link</a> and a <span className="rm-block-ref">block reference</span>.
        </div>
      );
    case "tags":
      return (
        <div className="roam-block">
          Tagged <span className="rm-page-ref rm-page-ref--tag">#idea</span> and <span className="rm-page-ref rm-page-ref--tag">#[[project notes]]</span>
        </div>
      );
    case "dates":
      return (
        <div className="roam-block">
          Due <span data-link-uid="11-22-2026"><span className="rm-page-ref rm-page-ref--link">November 22nd, 2026</span></span> after{" "}
          <span data-link-uid="sample"><span className="rm-page-ref rm-page-ref--link">Project</span></span>
        </div>
      );
    default:
      return null;
  }
}

export const hasSample = (group: Group): boolean => ["headings", "links", "tags", "dates"].includes(group.id);

export function GroupSample({ group }: { group: Group; store: SettingsStore }) {
  if (!hasSample(group)) return null;
  return (
    <div className="roamstudio-samples" aria-label="Preview">
      {(["light", "dark"] as const).map((mode) => (
        <div key={mode} className={`roamstudio-sample bp3-${mode}`} data-mode={mode} style={{ colorScheme: mode }}>
          <SampleBody group={group} />
        </div>
      ))}
    </div>
  );
}
