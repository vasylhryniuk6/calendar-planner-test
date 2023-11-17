'use client';

import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

type InputProps = React.ComponentProps<'input'> & {
  disabled?: boolean;
};

export const Input = <T extends FieldValues = FieldValues>(
  props: UseControllerProps<T> & InputProps,
  { disabled }: InputProps,
) => {
  const { field } = useController(props);

  return (
    <div>
      <input {...field} {...props} disabled={disabled} />
    </div>
  );
};
