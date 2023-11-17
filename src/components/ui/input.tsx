'use client';

import React, { useId } from 'react';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

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
