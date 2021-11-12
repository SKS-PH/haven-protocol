import {Component} from 'solid-js';

export enum SearchInputSize {
  MEDIUM = 'medium',
}

const SIZE_CLASSES: Record<SearchInputSize, string> = {
  [SearchInputSize.MEDIUM]: 'h-12',
};

type SearchInputProps = {
  size?: SearchInputSize,
  placeholder?: string,
  name?: string,
}

export const SearchInput: Component<SearchInputProps> = (props) => {
  const sizeClassNames = SIZE_CLASSES[props.size ?? SearchInputSize.MEDIUM];

  return (
    <input
      className={`box-border border bg-transparent border-solid rounded-full p-4 placeholder:uppercase border-primary ${sizeClassNames}`}
      type="search"
      placeholder={props.placeholder}
    />
  );
}
