import {Component} from 'solid-js';

export enum ButtonVariant {
  OUTLINE = 'outline',
  FILLED = 'filled',
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  [ButtonVariant.OUTLINE]: 'border-primary text-primary no-underline',
  [ButtonVariant.FILLED]: 'border-primary bg-primary text-fg-inverse'
};

export enum ButtonSize {
  MEDIUM = 'medium',
  LARGE = 'large',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  [ButtonSize.MEDIUM]: 'h-12',
  [ButtonSize.LARGE]: 'h-16',
};

export type ButtonProps = {
  variant?: ButtonVariant,
  size?: ButtonSize,
  component?: any, // FIXME - proper typing
  href?: string,
  block?: boolean,
};

export const LinkButton: Component<ButtonProps> = (props) => {
  const variantClassName = VARIANT_CLASSES[props.variant ?? ButtonVariant.OUTLINE];
  const sizeClassName = SIZE_CLASSES[props.size ?? ButtonSize.MEDIUM];
  const Component = (props.component ?? 'a');

  return (
    <Component
      href={props.href}
      className={`box-border border border-solid cursor-pointer px-4 justify-center items-center uppercase font-bold rounded-full ${props.block ? 'w-full flex' : 'inline-flex'} ${variantClassName} ${sizeClassName}`}
    >
      {props.children}
    </Component>
  )
}
