import React from 'react'

export default function Alert({ label, color }) {
    const getAlertClasses = () => {
        switch (color) {
            case 'info':
                return 'text-blue-800 border-blue-300 bg-blue-50 ';
            case 'danger':
                return 'text-red-800 border-red-300 bg-red-50 ';
            case 'success':
                return 'text-lime-800 border-lime-300 bg-lime-50 ';
            case 'warning':
                return 'text-yellow-700 border-yellow-400 bg-yellow-50';
            case 'dark':
                return 'text-slate-800 border-slate-300 bg-slate-50 ';
            default:
                return '';
        }
    };

    return (
        <div className={`flex items-center p-4 mb-4 text-sm border rounded-lg ${getAlertClasses()}`} role="alert">
            <svg
                className="flex-shrink-0 inline w-4 h-4 mr-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">{color}</span>
            <div>
                <span className="font-medium">{label}</span>
            </div>
        </div>
    );
}
