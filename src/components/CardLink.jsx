import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function CardLink(props) {
    return (
        <div className="w-full pt-6 bg-white border border-slate-200 rounded-lg shadow-lg mb-4 cursor-pointer">
            <div className="px-6 text-center">
                <Icon icon={props.icon} size={40} animation />
                <h5
                    className="mb-2 text-2xl hover:text-3xl font-semibold tracking-tight text-slate-900 transition-all duration-200"
                >
                    {props.label}
                </h5>
            </div>
            <Link to={props.link}>
                <Button className='text-2xl' label={<Icon icon='redirect' size={25} animation />} {...props} />
            </Link>
        </div>
    );
}
