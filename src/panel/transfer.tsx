/**
 * Export and import controls at the top of the settings panel (`settings-transfer`).
 * The document logic is in settings/transfer.ts; this file only reads files, the
 * clipboard and the dialog's text, and shows what an import would do.
 */
import React, { useEffect, useRef, useState } from "react";
import { Button, Dialog, FileInput, Popover, TextArea } from "@blueprintjs/core";
import type { SettingsStore } from "../settings/store";
import { MAX_INPUT_LENGTH, applyImport, exportDocument, exportFileName, importPlan, readDocument, serialize } from "../settings/transfer";

const NOTICE_MS = 4000;

type Notice = { text: string; kind: "done" | "failed" } | null;

/** Saves the export as a file through a temporary download link. */
export function downloadExport(store: SettingsStore): void {
  const text = serialize(exportDocument(store.lookup));
  const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = exportFileName(new Date());
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

/** Moves focus between the buttons of a menu with the arrow keys. */
function arrowKeys(event: React.KeyboardEvent<HTMLElement>) {
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
  const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
  const at = buttons.indexOf(document.activeElement as HTMLButtonElement);
  const next = event.key === "ArrowDown" ? (at + 1) % buttons.length : (at - 1 + buttons.length) % buttons.length;
  buttons[next]?.focus();
  event.preventDefault();
}

export function TransferRow({ store }: { store: SettingsStore }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notice || notice.kind === "failed") return;
    const timer = setTimeout(() => setNotice(null), NOTICE_MS);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    if (menuOpen) menuRef.current?.querySelector("button")?.focus();
  }, [menuOpen]);

  const download = () => {
    setMenuOpen(false);
    downloadExport(store);
    setNotice(null);
  };
  const copy = () => {
    setMenuOpen(false);
    const text = serialize(exportDocument(store.lookup));
    const write = navigator.clipboard?.writeText(text) ?? Promise.reject(new Error("no clipboard"));
    write.then(
      () => setNotice({ text: "Copied to the clipboard.", kind: "done" }),
      () => setNotice({ text: "Copying to the clipboard failed.", kind: "failed" }),
    );
  };

  const menu = (
    <div className="bp3-menu roamstudio-export-menu" ref={menuRef} onKeyDown={arrowKeys}>
      <Button className="roamstudio-export-menu__item" minimal fill alignText="left" icon="download" text="Download file" onClick={download} />
      <Button className="roamstudio-export-menu__item" minimal fill alignText="left" icon="clipboard" text="Copy to clipboard" onClick={copy} />
    </div>
  );

  return (
    <div className="roamstudio-transfer">
      <Popover content={menu} position="bottom-left" minimal isOpen={menuOpen} onInteraction={setMenuOpen}>
        <Button className="roamstudio-transfer__export" small icon="export" rightIcon="caret-down" text="Export" />
      </Popover>
      <Button className="roamstudio-transfer__import" small icon="import" text="Import" onClick={() => setDialogOpen(true)} />
      {notice && (
        <span className={`roamstudio-transfer__notice roamstudio-transfer__notice--${notice.kind} bp3-text-muted`} role="status">
          {notice.text}
          {notice.kind === "failed" && <Button className="roamstudio-transfer__fallback" minimal small text="Download file instead" onClick={download} />}
        </span>
      )}
      <ImportDialog
        store={store}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onImported={() => {
          setDialogOpen(false);
          setNotice({ text: "Settings imported.", kind: "done" });
        }}
      />
    </div>
  );
}

const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

function ImportDialog({ store, isOpen, onClose, onImported }: { store: SettingsStore; isOpen: boolean; onClose: () => void; onImported: () => void }) {
  const [text, setText] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);

  const close = () => {
    setText("");
    setFileError(null);
    onClose();
  };
  const chooseFile = (event: React.FormEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    if (file.size > MAX_INPUT_LENGTH) {
      setFileError("This file is too large to be a Roam Studio settings export.");
      return;
    }
    setFileError(null);
    void file.text().then(setText);
  };

  const result = text.trim() ? readDocument(text) : null;
  const plan = result && !("error" in result) ? importPlan(result.settings, store) : null;
  const error = fileError ?? (result && "error" in result ? result.error : null);
  const apply = () => {
    if (!plan) return;
    applyImport(plan, store);
    setText("");
    onImported();
  };

  return (
    <Dialog className="roamstudio-import-dialog" isOpen={isOpen} title="Import Roam Studio settings" icon="import" onClose={close}>
      <div className="bp3-dialog-body">
        <p>Choose an exported file or paste its text. Importing replaces all Roam Studio settings: settings the export does not name go back to their default.</p>
        <FileInput className="roamstudio-import-dialog__file" fill text="Choose a file…" buttonText="Browse" inputProps={{ accept: ".json,application/json", "aria-label": "Settings file" }} onInputChange={chooseFile} />
        <TextArea
          className="roamstudio-import-dialog__text"
          fill
          value={text}
          placeholder='{ "format": "roam-studio-settings", … }'
          aria-label="Settings to import"
          onChange={(e) => {
            setFileError(null);
            setText(e.currentTarget.value);
          }}
        />
        {error && (
          <p className="roamstudio-import-dialog__error" role="alert">
            {error}
          </p>
        )}
        {plan && (
          <div className="roamstudio-import-dialog__summary" role="status">
            <p>
              {plan.changed.length + plan.reset.length === 0
                ? "Nothing changes: these are the current settings."
                : `${count(plan.changed.length, "setting changes", "settings change")}, ${count(plan.reset.length, "setting goes", "settings go")} back to the default.`}
            </p>
            {result && "skipped" in result && result.skipped.length > 0 && (
              <>
                <p>{count(result.skipped.length, "entry is", "entries are")} skipped:</p>
                <ul className="roamstudio-import-dialog__skipped">
                  {result.skipped.map((s) => (
                    <li key={s.key}>
                      <code>{s.key}</code>: {s.reason}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
      <div className="bp3-dialog-footer">
        <div className="bp3-dialog-footer-actions">
          <Button className="roamstudio-import-dialog__cancel" text="Cancel" onClick={close} />
          <Button className="roamstudio-import-dialog__apply" intent="primary" text="Apply" disabled={!plan} onClick={apply} />
        </div>
      </div>
    </Dialog>
  );
}
