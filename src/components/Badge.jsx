import React from 'react';

const Badge = ({ label, color }) => {
    const getColorClasses = () => {
        switch (color) {
            case 'info':
                return 'bg-blue-100 text-blue-800';
            case 'danger':
                return 'bg-red-100 text-red-800';
            case 'success':
                return 'bg-green-100 text-green-800';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800';
            case 'dark':
                return 'bg-slate-100 text-slate-800';
            case 'indigo':
                return 'bg-indigo-100 text-indigo-800';
            case 'purple':
                return 'bg-purple-100 text-purple-800';
            case 'blue':
                return 'bg-blue-100 text-blue-800';
            case 'secondary':
                return 'bg-amber-100 text-amber-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <span className={`text-sm font-medium mr-2 px-2.5 pb-1 pt-2 rounded dark:text-white ${getColorClasses()}`}>
            {label}
        </span>
    );
};

export default Badge;
