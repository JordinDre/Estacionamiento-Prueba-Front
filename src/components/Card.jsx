import React from 'react';

const Card = ({ title, subTitle, children }) => {

    return (
        <div className="bg-white shadow-md p-4 rounded-md">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-500">{subTitle}</p>
            <div className="mt-2">{children}</div>
        </div>
    );
};

export default Card;
