import {Component, JSX} from 'solid-js';

export enum ButtonVariant {
  OUTLINE = 'outline',
  FILLED = 'filled',
  OUTLINE_INVERSE = 'outline-inverse',
  FILLED_INVERSE = 'filled-inverse',
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  [ButtonVariant.OUTLINE]: 'border-primary text-primary no-underline',
  [ButtonVariant.FILLED]: 'border-primary bg-primary text-fg-inverse',
  [ButtonVariant.OUTLINE_INVERSE]: 'border-fg-inverse text-fg-inverse no-underline',
  [ButtonVariant.FILLED_INVERSE]: 'border-fg-inverse border-fg-inverse text-primary',
};

export enum ButtonSize {
  MEDIUM = 'medium',
  LARGE = 'large',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  [ButtonSize.MEDIUM]: 'h-12',
  [ButtonSize.LARGE]: 'h-16',
};

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  variant?: ButtonVariant,
  size?: ButtonSize,
  block?: boolean,
};

export const Button: Component<ButtonProps> = (props) => {
  const variantClassName = VARIANT_CLASSES[props.variant ?? ButtonVariant.OUTLINE];
  const sizeClassName = SIZE_CLASSES[props.size ?? ButtonSize.MEDIUM];

  return (
    <button
      {...props}
      className={`leading-none text-center box-border border border-solid cursor-pointer px-4 ${props.block ? 'w-full flex' : 'inline-flex'} justify-center space-x-2 items-center uppercase font-bold rounded-full ${variantClassName} ${sizeClassName}`}
    >
      {props.children}
    </button>
  )
}
