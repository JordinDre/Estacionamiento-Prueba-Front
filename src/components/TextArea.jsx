import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useField } from 'formik';

export default function TextArea({ formato = false, ...props }) {
    const [field, meta, helpers] = useField(props);

    const modules = {
        // Aquí puedes agregar las opciones y módulos deseados
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [/* { 'header': '1' }, { 'header': '2' }, */ { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            /* ['blockquote', 'code-block'], */
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            /* [{ 'direction': 'rtl' }], */
            ['link', /* 'image', 'video' */],
            /* ['clean'] */
        ],
    };

    return (
        <div className='mt-4 w-full'>
            <label htmlFor={props.name} className={`cursor-pointer text-md font-semibold ${meta.touched && meta.error && "text-red-600"}`}>{props.label}</label>
            {formato ?
                <ReactQuill
                    value={field.value}
                    onChange={value => helpers.setValue(value)}
                    modules={modules}
                    className={`bg-white border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                     ${meta.touched && meta.error && "border-red-600"}`}
                    placeholder={props.placeholder ? props.placeholder : 'Agregar Información...'}
                />
                :
                <textarea {...field} {...props} rows={props.rows ? props.rows : "5"} className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  
                ${meta.touched && meta.error && "border-red-600"}`} placeholder={props.placeholder ? props.placeholder : 'Agregar Información...'}>
                    {props.children}
                </textarea>
            }
            {meta.touched && meta.error ? (
                <div className="text-red-600">{meta.error}</div>
            ) : null}
        </div>
    );
}
