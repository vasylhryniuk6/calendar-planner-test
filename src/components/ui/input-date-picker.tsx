'use client';

import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

export type InputDatepickerProps = {
  label: string;
};

export const InputDatepicker = <T extends FieldValues = FieldValues>(
  props: UseControllerProps<T> & InputDatepickerProps,
) => {
  const { field, formState } = useController(props);

  const { label } = props;

  return (
    <div className=" mb-2 flex flex-col">
      <div className="mb-2">
        <span>{label}</span>
        <span className="text-gray-400">*</span>
      </div>
      <DatePicker
        showIcon
        selected={field.value}
        {...field}
        {...props}
        autoComplete="off"
        minDate={new Date()}
        onChange={field.onChange}
        className="w-full border border-gray-300"
        placeholderText="Select date"
      />
      {formState.errors && (
        <span className="text-xs text-red-700">
          {formState.errors?.[field.name]?.message as string}
        </span>
      )}
    </div>
  );
};
