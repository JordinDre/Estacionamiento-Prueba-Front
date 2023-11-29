import React, { useState } from 'react';
import Select from 'react-select';
import { useField } from 'formik';
import Modal from './Modal';
import Icon from './Icon';

const CustomSelect = ({
  label,
  options,
  customOptions,
  isMulti,
  onChange,
  maxRecords,
  modal,
  desiredOptions,
  isLoading,
  value,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name);
  const { setValue } = helpers;

  // Estado local para el valor del input de búsqueda
  const [inputValue, setInputValue] = useState('');

  const getFieldValue = (obj, fields) => {
    let currentValue = obj;
  
    for (let i = 0; i < fields.length; i++) {
      if (currentValue === null || currentValue === undefined) {
        return null;
      }
      currentValue = currentValue[fields[i]];
    }
  
    return currentValue;
  };
  

  const getOptionLabel = (option) => {
    const labels = customOptions.map((opt) => getFieldValue(option, opt.split('.'))).filter(Boolean);
    return labels.length > 0 ? labels.join(' - ') : '';
  };

  const getOptionValue = (option) => {
    const value = getFieldValue(option, customOptions[0].split('.'));
    return value !== null ? value : "";
  };
  

  const handleChange = (selectedOption) => {
    if (isMulti) {
      setValue(selectedOption || []);
    } else {
      const selectedValue = selectedOption && selectedOption.value ? selectedOption.value : selectedOption;
      setValue(selectedValue || '');
    }

    if (typeof onChange === 'function') {
      onChange(selectedOption);
    }
  };

  const filterOptions = (input) => {
    const searchWords = input.toLowerCase().split(/\s+/);

    let filteredBasedOnDesired = desiredOptions
      ? options.filter(option => desiredOptions.includes(option.id) || desiredOptions.includes(option.name))
      : options;

    // Si hay un valor de entrada, filtramos basado en el valor de entrada
    if (input) {
      filteredBasedOnDesired = filteredBasedOnDesired.filter(option => {
        const optionLabel = getOptionLabel(option).toLowerCase();
        return searchWords.every(word => optionLabel.includes(word));
      });
    }

    return filteredBasedOnDesired;
  };

  const displayedOptions = isLoading ? [] : filterOptions(inputValue);

  const filteredOptions = desiredOptions
    ? options.filter((option) => desiredOptions.includes(option.id) || desiredOptions.includes(option.name))
    : options;

  let valorPreselect = null;
  if (value) {
    const { field: campoPreseleccionado, value: valorCampoPreseleccionado } = value;
    if (campoPreseleccionado && valorCampoPreseleccionado) {
      valorPreselect = filteredOptions.find(option => option[campoPreseleccionado] === valorCampoPreseleccionado);
    }
  }

  return (
    <div className="form-group mt-4 cursor-pointer w-full">
      <label className="font-bold cursor-pointer" htmlFor={props.name}>
        {label}
      </label>
      <div className="flex">
        {isLoading ? (
          <div className="w-full flex items-center justify-center text-gray-500">
            Cargando...
          </div>
        ) : (
          <Select
            {...props}
            filterOption={null}
            isDisabled={props.disabled ? props.disabled : false}
            id={props.name}
            name={props.name}
            value={valorPreselect || field.value}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={setInputValue}
            placeholder={props.placeholder ? props.placeholder : 'Seleccionar...'}
            isClearable
            options={displayedOptions}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isMulti={isMulti}
            className={`cursor-pointer w-full focus:ring-blue-500 focus:border-blue-500 ${meta.touched && meta.error && 'border-red-600'}`}
            menuPlacement="bottom"
            menuPosition="fixed"
          />
        )}
        {modal && !props.disabled && (
          <div className="">
            <Modal {...modal} button={<Icon icon="agregar" />} color='dark' title={modal.tooltip} disabled={props.disabled} />
          </div>
        )}
      </div>
      {meta.touched && meta.error ? <div className="text-red-600">{meta.error}</div> : null}
    </div>
  );
};

export default CustomSelect;
