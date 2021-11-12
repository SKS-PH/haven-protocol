import {Component} from 'solid-js';

export enum LogoSize {
  MEDIUM = 'medium',
  LARGE = 'large',
}

const SIZE_CLASSES: Record<LogoSize, string> = {
  [LogoSize.MEDIUM]: 'w-10 h-10 border text-base',
  [LogoSize.LARGE]: 'w-20 h-20 border-2 text-3xl',
};

type Props = {
  size?: LogoSize
}

export const Logo: Component<Props> = (props) => {
  const sizeClassName = SIZE_CLASSES[props.size ?? LogoSize.MEDIUM];

  return (
    <div
      role="presentation"
      className={`inline-flex select-none justify-center items-center ${sizeClassName} border-current border-solid rounded`}
    >
      HVN
    </div>
  )
}
