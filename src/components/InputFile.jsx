import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const InputFile = ({ name, label, onChange, disabled, archivoActual = '' }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
    onChange(event);
  };

  const openImageInNewWindow = () => {
    window.open(archivoActual, '_blank');
  };

  return (
    <div className="my-4 w-full">
      <label htmlFor={name} className="block font-bold">
        {label}
      </label>
      <div className='flex gap-2'>
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          disabled={disabled}
          className="border rounded-md w-full"
        />
        {archivoActual != '' && < Button label='Archivo' onClick={openImageInNewWindow} />}
      </div>
      {preview && (
        <div className="max-w-xs mx-auto mt-2">
          <img src={preview} alt="Preview" className="w-full h-auto" />
        </div>
      )}
      {archivoActual != '' && <div className="max-w-xs mx-auto mt-10">
        <img src={archivoActual} alt="" className="w-full h-auto" />
      </div>}
    </div>
  );
};

InputFile.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default InputFile;
