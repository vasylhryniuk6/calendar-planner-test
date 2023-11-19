'use client';

import React, { useId } from 'react';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

type InputProps = React.ComponentProps<'input'> & {
  disabled?: boolean;
  label?: string;
  requiredmark?: string;
};

export const Input = <T extends FieldValues>(
  props: UseControllerProps<T> & InputProps,
) => {
  const { field, formState } = useController(props);
  const id = useId();

  const { label, disabled, requiredmark } = props;
  return (
    <fieldset className="flex flex-col">
      {label && (
        <label htmlFor={id}>
          <span>{label}</span>
          {requiredmark && <span className="text-gray-400">*</span>}{' '}
        </label>
      )}
      <input
        className="border-b border-gray-400 p-1 outline-none"
        id={id}
        {...field}
        {...props}
        disabled={disabled}
      />
      {formState.errors && (
        <span className="text-xs text-red-700">
          {formState.errors?.[field.name]?.message as string}
        </span>
      )}
    </fieldset>
  );
};
