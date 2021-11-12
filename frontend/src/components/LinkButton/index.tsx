import {Component, JSX} from 'solid-js';
import {ValidConstructor} from '../../utils/types';

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

export type ButtonProps<T extends ValidConstructor = 'a'> = JSX.IntrinsicElements['a'] & {
  variant?: ButtonVariant,
  size?: ButtonSize,
  component?: T,
  href?: string,
  block?: boolean,
};

export const LinkButton = <T extends ValidConstructor = 'a'>(props: ButtonProps<T>) => {
  const variantClassName = VARIANT_CLASSES[props.variant ?? ButtonVariant.OUTLINE];
  const sizeClassName = SIZE_CLASSES[props.size ?? ButtonSize.MEDIUM];
  const RenderedComponent = (props.component ?? 'a');

  return (
    <RenderedComponent
      {...props}
      href={props.href}
      className={`leading-none text-center box-border border border-solid cursor-pointer px-4 ${props.block ? 'w-full flex' : 'inline-flex'} justify-center items-center uppercase font-bold rounded-full ${variantClassName} ${sizeClassName}`}
    >
      {props.children}
    </RenderedComponent>
  )
}
