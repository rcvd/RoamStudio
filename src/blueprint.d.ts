/**
 * The BlueprintJS 3 components the settings panel uses. Roam provides them at
 * runtime as `window.Blueprint.Core` (a webpack external), so the bundle contains no
 * BlueprintJS code; this declares only the props the panel passes. Tests replace the
 * module with test/stubs/blueprint.tsx.
 */
declare module "@blueprintjs/core" {
  import type { ComponentType, CSSProperties, ChangeEvent, FormEvent, MouseEvent, ReactElement, ReactNode } from "react";

  type Intent = "none" | "primary" | "success" | "warning" | "danger";
  type Position = "bottom" | "bottom-left" | "bottom-right" | "top" | "left" | "right";

  export interface ButtonProps {
    text?: ReactNode;
    icon?: string | ReactElement;
    rightIcon?: string | ReactElement;
    minimal?: boolean;
    small?: boolean;
    active?: boolean;
    disabled?: boolean;
    fill?: boolean;
    alignText?: "left" | "center" | "right";
    intent?: Intent;
    className?: string;
    title?: string;
    style?: CSSProperties;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    children?: ReactNode;
    "aria-expanded"?: boolean;
    "aria-label"?: string;
    "aria-pressed"?: boolean;
  }
  export const Button: ComponentType<ButtonProps>;
  export const ButtonGroup: ComponentType<{ minimal?: boolean; fill?: boolean; className?: string; children?: ReactNode }>;
  export const Collapse: ComponentType<{ isOpen: boolean; keepChildrenMounted?: boolean; transitionDuration?: number; children?: ReactNode }>;
  export const Switch: ComponentType<{
    checked?: boolean;
    label?: string;
    large?: boolean;
    alignIndicator?: "left" | "right";
    className?: string;
    onChange?: (event: FormEvent<HTMLInputElement>) => void;
  }>;
  export const HTMLSelect: ComponentType<{
    value?: string;
    options?: Array<string | { value: string; label?: string }>;
    minimal?: boolean;
    className?: string;
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  }>;
  export const Popover: ComponentType<{
    content?: ReactNode;
    position?: Position;
    minimal?: boolean;
    isOpen?: boolean;
    usePortal?: boolean;
    autoFocus?: boolean;
    enforceFocus?: boolean;
    className?: string;
    popoverClassName?: string;
    onInteraction?: (nextOpenState: boolean) => void;
    onClosed?: () => void;
    children?: ReactNode;
  }>;
  export const Menu: ComponentType<{ className?: string; children?: ReactNode }>;
  export const MenuItem: ComponentType<{
    text?: ReactNode;
    active?: boolean;
    icon?: string;
    labelElement?: ReactNode;
    className?: string;
    style?: CSSProperties;
    shouldDismissPopover?: boolean;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
    onFocus?: () => void;
  }>;
  export const Tag: ComponentType<{ minimal?: boolean; round?: boolean; intent?: Intent; className?: string; title?: string; children?: ReactNode }>;
  export const Icon: ComponentType<{ icon: string; iconSize?: number; className?: string; title?: string; intent?: Intent }>;
  export const Tooltip: ComponentType<{ content?: ReactNode; position?: Position; className?: string; children?: ReactNode }>;
  export const Dialog: ComponentType<{
    isOpen: boolean;
    title?: ReactNode;
    icon?: string;
    className?: string;
    canOutsideClickClose?: boolean;
    onClose?: () => void;
    children?: ReactNode;
  }>;
  export const TextArea: ComponentType<{
    value?: string;
    placeholder?: string;
    fill?: boolean;
    growVertically?: boolean;
    className?: string;
    "aria-label"?: string;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  }>;
  export const FileInput: ComponentType<{
    text?: ReactNode;
    buttonText?: string;
    fill?: boolean;
    className?: string;
    inputProps?: { accept?: string; "aria-label"?: string };
    onInputChange?: (event: FormEvent<HTMLInputElement>) => void;
  }>;
}
