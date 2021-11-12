import {Component, JSX} from 'solid-js';
import {Icon} from '../Icon';

export enum SearchInputSize {
  MEDIUM = 'medium',
}

const SIZE_CLASSES: Record<SearchInputSize, string> = {
  [SearchInputSize.MEDIUM]: 'h-12 pr-12',
};

const INDICATOR_CLASSES: Record<SearchInputSize, string> = {
  [SearchInputSize.MEDIUM]: 'w-12',
};

type SearchInputProps = JSX.IntrinsicElements['input'] & {
  size?: SearchInputSize,
  block?: boolean,
}

export const SearchInput: Component<SearchInputProps> = (props) => {
  const sizeClassNames = SIZE_CLASSES[props.size ?? SearchInputSize.MEDIUM];
  const indicatorClassNames = INDICATOR_CLASSES[props.size ?? SearchInputSize.MEDIUM];

  return (
    <div
      className={`relative ${!props.block && 'inline-block align-middle'}`}
    >
      <input
        {...props}
        className={`w-full focus:outline-none box-border border bg-transparent border-solid rounded-full pl-4 placeholder:uppercase border-primary ${sizeClassNames} relative`}
        type="search"
        placeholder={props.placeholder}
      />
      <div className={`absolute top-0 right-0 h-full pointer-events-none flex justify-center items-center ${indicatorClassNames}`}>
        <Icon
          name="search"
        />
      </div>
    </div>
  );
}
