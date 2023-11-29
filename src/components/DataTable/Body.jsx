import React, { useState } from 'react';

export default function Body({ columns, rows, onSort, sortField, sortOrder }) {
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);

    const getSortIcon = (field) => {
        if (sortField !== field) return;
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    const handleRowClick = (index) => {
        setSelectedRowIndex(index);
    };

    return (
        <div className="mb-1 bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="px-2 py-1 xl:py-3 text-left text-md font-normal "/*  onClick={() => onSort(column.field)} */>
                                {column.header} {getSortIcon(column.field)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {rows.map((row, index) => (
                        <tr key={index} className={`hover:bg-blue-300 hover:text-black ${selectedRowIndex === index ? 'bg-blue-200' : ''}`} onClick={() => handleRowClick(index)}>
                            {columns.map((column) => (
                                <td key={column.field} className="px-2 py-1 whitespace-nowrap cursor-pointer">{row[column.field]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
