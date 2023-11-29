import React, { useState, useEffect } from 'react';
import { useField } from 'formik';

export default function Switch({ className, label, color, disabled, name, id, ...rest }) {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const [checked, setChecked] = useState(value || false);

  useEffect(() => {
    if (value !== checked) {
      setChecked(value);
    }
  }, [value]);

  const handleChange = () => {
    if (!disabled) {
      const newValue = !checked;
      setChecked(newValue);
      setValue(newValue);
    }
  };

  let switchColorClass =
    'bg-blue-200 peer-focus:ring-blue-300 peer-checked:bg-blue-600';

  if (color === 'danger') {
    switchColorClass = 'bg-red-200 peer-focus:ring-red-300 peer-checked:bg-red-700';
  } else if (color === 'success') {
    switchColorClass = 'bg-lime-200 peer-focus:ring-lime-300 peer-checked:bg-lime-600';
  } else if (color === 'warning') {
    switchColorClass = 'bg-yellow-200 peer-focus:ring-yellow-300 peer-checked:bg-yellow-500';
  } else if (color === 'amber') {
    switchColorClass = 'bg-amber-200 peer-focus:ring-amber-300 peer-checked:bg-amber-600';
  } else if (color === 'dark') {
    switchColorClass = 'bg-slate-800 peer-focus:ring-slate-900 peer-checked:bg-slate-900';
  }

  return (
    <label
      className={`relative inline-flex items-center cursor-pointer mt-5 ${className}`}
      htmlFor={id}
      {...rest}
    >
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        id={id}
      />
      <div
        className={`w-11 h-6 ${switchColorClass} peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      ></div>
      <span className="ml-3 text-md font-semibold text-slate-900">{label}</span>
    </label>
  );
}


/* 
    const [switchValue, setSwitchValue] = useState(false);
    console.log(switchValue)

    <Switch
        color='danger'
        disabled={true}
        checked={switchValue}
        onChange={(e) => setSwitchValue(e.target.checked)}
        label="Toggle me"
    />
*/