'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { add } from 'date-fns';
import DatePicker from 'react-datepicker';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

export type InputDatepickerProps = {
  labelText: string;
};

export const InputDatepicker = <T extends FieldValues = FieldValues>(
  props: UseControllerProps<T> & InputDatepickerProps,
) => {
  const { field } = useController(props);

  const { labelText } = props;

  const maxDay = add(new Date(), { days: 15 });

  return (
    <div className=" mb-2 flex flex-col">
      <div className="mb-2">
        <span className="text-red-800">*</span> {labelText}
      </div>
      <DatePicker
        showIcon
        selected={field.value}
        {...field}
        {...props}
        autoComplete="off"
        minDate={new Date()}
        maxDate={maxDay}
        onChange={field.onChange}
        className="w-full border border-gray-300"
        placeholderText="Select date"
      />
    </div>
  );
};
