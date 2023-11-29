import React from 'react';
import { useField } from 'formik';

export default function Checkbox({ name, label, description, color, onChange = () => { } }) {
  let checkboxColorClass = 'text-blue-600 focus:ring-blue-500';

  if (color === 'danger') {
    checkboxColorClass = 'text-red-500 focus:ring-red-500';
  } else if (color === 'success') {
    checkboxColorClass = 'text-green-500 focus:ring-green-500';
  } else if (color === 'dark') {
    checkboxColorClass = 'text-gray-900 focus:ring-gray-900';
  } else if (color === 'warning') {
    checkboxColorClass = 'text-yellow-500 focus:ring-yellow-500';
  } else if (color === 'info') {
    checkboxColorClass = 'text-blue-500 focus:ring-blue-500';
  }

  const [field] = useField({ name });
  const { value } = field;

  const handleChange = (e) => {
    const newValue = e.target.checked;
    field.onChange(e);
    onChange(newValue); // Llama a la función onChange pasando el nuevo valor del checkbox
  };

  return (
    <div className="flex items-end my-3">
      <input
        id={name}
        aria-describedby={`${name}-text`}
        type="checkbox"
        {...field}
        checked={value}
        onChange={handleChange} // Usa la función handleChange para manejar el cambio
        className={`w-5 h-5 bg-gray-100 border-gray-300 rounded cursor-pointer ${checkboxColorClass}`}
      />
      <div className="ml-2 text-base">
        <label htmlFor={name} className="font-bold text-gray-900 cursor-pointer">
          {label}
        </label>
        <p id={`${name}-text`} className="text-sm font-normal text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}
