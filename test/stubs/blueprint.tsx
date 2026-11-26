/**
 * A minimal stand-in for BlueprintJS 3 in tests. Roam provides the real components
 * at runtime (window.Blueprint.Core); these render plain, accessible HTML with the
 * same props, so the panel's behavior can be tested in jsdom.
 */
import React, { type ReactNode } from "react";

type Props = Record<string, unknown> & { children?: ReactNode; className?: string };

export function Button({ text, icon, rightIcon, children, className, active, disabled, onClick, title, style, minimal: _m, small: _s, fill: _f, alignText: _a, intent: _i, ...rest }: Props) {
  return (
    <button
      type="button"
      className={["bp3-button", active ? "bp3-active" : "", className ?? ""].join(" ").trim()}
      disabled={disabled as boolean}
      title={title as string}
      style={style as React.CSSProperties}
      data-icon={typeof icon === "string" ? icon : undefined}
      onClick={onClick as React.MouseEventHandler}
      {...(rest as object)}
    >
      {typeof icon === "object" ? (icon as ReactNode) : null}
      {text as ReactNode}
      {children}
      {typeof rightIcon === "string" ? <span data-icon={rightIcon} /> : null}
    </button>
  );
}

export const ButtonGroup = ({ children, className }: Props) => <div className={`bp3-button-group ${className ?? ""}`}>{children}</div>;

export const Collapse = ({ isOpen, children }: Props) => (isOpen ? <div className="bp3-collapse">{children}</div> : null);

export const Switch = ({ checked, onChange, className, label }: Props) => (
  <label className={`bp3-control bp3-switch ${className ?? ""}`}>
    <input type="checkbox" checked={checked as boolean} onChange={onChange as React.ChangeEventHandler} />
    {label as ReactNode}
  </label>
);

export const HTMLSelect = ({ value, options, onChange, className }: Props) => (
  <select className={`bp3-html-select ${className ?? ""}`} value={value as string} onChange={onChange as React.ChangeEventHandler}>
    {(options as Array<{ value: string; label?: string }>).map((o) => (
      <option key={o.value} value={o.value}>
        {o.label ?? o.value}
      </option>
    ))}
  </select>
);

/** Clicking the target toggles; Escape inside the content closes. */
export function Popover({ content, isOpen, onInteraction, children, popoverClassName }: Props) {
  const toggle = onInteraction as (next: boolean) => void;
  return (
    <span className="bp3-popover-wrapper">
      <span className="bp3-popover-target" onClick={() => toggle(!isOpen)}>
        {children}
      </span>
      {isOpen ? (
        <div className={`bp3-popover ${popoverClassName ?? ""}`} onKeyDown={(e) => e.key === "Escape" && toggle(false)}>
          {content as ReactNode}
        </div>
      ) : null}
    </span>
  );
}

export const Menu = ({ children, className }: Props) => <ul className={`bp3-menu ${className ?? ""}`}>{children}</ul>;

export const MenuItem = ({ text, onClick, style, active }: Props) => (
  <li>
    <a role="menuitem" className={`bp3-menu-item ${active ? "bp3-active" : ""}`} style={style as React.CSSProperties} onClick={onClick as React.MouseEventHandler}>
      {text as ReactNode}
    </a>
  </li>
);

export const Tag = ({ children, className, title }: Props) => <span className={`bp3-tag ${className ?? ""}`} title={title as string}>{children}</span>;

export const Icon = ({ icon, className, title }: Props) => <span className={`bp3-icon ${className ?? ""}`} data-icon={icon as string} title={title as string} />;

export const Tooltip = ({ children }: Props) => <>{children}</>;

/** Renders its content while open; Escape calls onClose. */
export const Dialog = ({ isOpen, title, className, onClose, children }: Props) =>
  isOpen ? (
    <div className={`bp3-dialog ${className ?? ""}`} role="dialog" aria-label={title as string} onKeyDown={(e) => e.key === "Escape" && (onClose as () => void)?.()}>
      <div className="bp3-dialog-header">{title as ReactNode}</div>
      {children}
    </div>
  ) : null;

export const TextArea = ({ value, onChange, className, placeholder, "aria-label": label }: Props) => (
  <textarea className={`bp3-input ${className ?? ""}`} value={value as string} placeholder={placeholder as string} aria-label={label as string} onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>} />
);

export const FileInput = ({ text, className, inputProps, onInputChange }: Props) => (
  <label className={`bp3-file-input ${className ?? ""}`}>
    <input type="file" {...(inputProps as object)} onChange={onInputChange as React.ChangeEventHandler<HTMLInputElement>} />
    <span className="bp3-file-upload-input">{text as ReactNode}</span>
  </label>
);
