'use client';

import React, { useId } from 'react';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

// TODO: React does not recognize the `isRequired` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `isrequired` instead. If you accidentally passed it from a parent component, remove it from the DOM element.

type InputProps = React.ComponentProps<'input'> & {
  disabled?: boolean;
  label?: string;
  isRequired?: boolean;
};

export const Input = <T extends FieldValues = FieldValues>(
  props: UseControllerProps<T> & InputProps,
) => {
  const { field } = useController(props);
  const id = useId();

  const { label, disabled, isRequired } = props;

  return (
    <fieldset className="flex flex-col">
      {label && (
        <label htmlFor={id}>
          <span>{label}</span>
          {isRequired && <span className="text-gray-400">*</span>}
        </label>
      )}
      <input
        className="border-b border-gray-400 p-1 outline-none"
        id={id}
        {...field}
        {...props}
        disabled={disabled}
      />
    </fieldset>
  );
};
