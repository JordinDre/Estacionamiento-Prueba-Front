import { useField } from 'formik';
import React from 'react';

export default function Input({ label, className, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <div className={`mt-4 w-full`}>
      <label
        htmlFor={props.id}
        className={`cursor-pointer text-md font-semibold ${meta.touched && meta.error && "text-red-600"}`}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        type={props.type ? props.type : 'text'}
        className={`bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  
          ${meta.touched && meta.error && "border-red-600"} ${className}`}
      />
      {meta.touched && meta.error && (
        <div className="text-red-600">{meta.error}</div>
      )}
    </div>
  );
}
