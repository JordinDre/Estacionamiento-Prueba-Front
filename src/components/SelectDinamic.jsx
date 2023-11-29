import React, { useState, useEffect } from 'react';
import Select, { createFilter } from 'react-select';
import axioss from '../utils/axios';

const SelectDinamic = ({ name, label, setFieldValue, setFieldTouched }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (inputValue && inputValue !== selectedOption?.label) {
            axioss.get(`/vehiculos/buscar/${inputValue}`)
                .then(res => {
                    const formattedOptions = res.data.map(vehiculo => ({
                        label: vehiculo.placa,
                        value: vehiculo.id
                    }));
                    setOptions(formattedOptions);
                })
                .catch(err => console.error(err));
        }
    }, [inputValue, selectedOption]);

    const handleInputChange = (value) => {
        setInputValue(value);
        setFieldValue(name, value);
    };

    const handleChange = (option) => {
        setSelectedOption(option);
        setFieldValue(name, option ? option.label : '');
        setFieldTouched(name, true);
    };

    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            <Select
                name={name}
                value={selectedOption}
                onInputChange={handleInputChange}
                onChange={handleChange}
                options={options}
                filterOption={createFilter({ ignoreAccents: false })}
                isClearable
            />
        </div>
    );
};

export default SelectDinamic;
