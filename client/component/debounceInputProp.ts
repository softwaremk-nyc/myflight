import React from 'react';

const formControl = 'form-control form-control-sm';
export const textDebounce = (
  id: string,
  placeholder: string,
  minLength: number,
  maxLength: number,
  cb: (val: string) => void,
  debounceTimeout: number = 1000,
) => ({
  type: 'text',
  id,
  minLength,
  maxLength,
  debounceTimeout,
  className: formControl,
  placeholder,
  'aria-label': placeholder,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
    cb(event.target.value.toUpperCase());
  },
  onFocus: (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.select();
  },
});

export const numberDebounce = (
  id: string,
  value: number,
  placeholder: string,
  cb: (val: number) => void,
  minVal: number = -1,
  maxVal: number = -1,
  debounceTimeout: number = 500,
) => {
  const className = minVal !== -1 && maxVal !== -1 && (value < minVal || value > maxVal)
    ? `${formControl} border border-danger`
    : `${formControl}`;

  return {
    type: 'number',
    id,
    debounceTimeout,
    className,
    placeholder,
    'aria-label': placeholder,
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number.isNaN(event.target.valueAsNumber)
        ? 0
        : event.target.valueAsNumber;
      cb(val);
    },
    onFocus: (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.select();
    },
  };
};
