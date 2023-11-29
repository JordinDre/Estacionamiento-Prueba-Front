import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

export default function Tabla({
    columns = [],
    rows = [],
    search,
    rowsPerPage = 12,
    onRowClick = () => { },
    hiddenColumns = [],
    isLoading = false,
    exportable = false,
    fileName = 'tabla'
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState({});
    const [exporting, setExporting] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);

    useEffect(() => {
        let filteredData = [...rows];

        // Filter rows based on search term
        if (searchTerm) {
            const searchWords = searchTerm.toLowerCase().split(' ');
            filteredData = filteredData.filter((row) =>
                searchWords.some((word) =>
                    Object.entries(row).some(([key, value]) => {
                        const stringValue = String(value).toLowerCase();
                        return key.includes(word) || stringValue.includes(word);
                    })
                )
            );
            setCurrentPage(1);
        }

        // Sort filtered data based on sortOrder
        if (Object.keys(sortOrder).length > 0) {
            filteredData = filteredData.sort((a, b) => {
                // Sorting logic here
            });
        }

        setFilteredRows(filteredData);
    }, [searchTerm, sortOrder, rows]);

    const totalRows = filteredRows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleRows = filteredRows
        .filter((row) => {
            const searchWords = searchTerm.toLowerCase().split(' ');
            const matchesSearchTerm = searchWords.every((word) =>
                Object.entries(row).some(([key, value]) => {
                    const stringValue = String(value).toLowerCase();
                    return key.includes(word) || stringValue.includes(word);
                })
            );
            return matchesSearchTerm;
        })
        .sort((a, b) => {
            if (Object.keys(sortOrder).length === 0) {
                return 0;
            }

            for (const field in sortOrder) {
                const order = sortOrder[field];
                const valueA = a[field];
                const valueB = b[field];

                if (valueA === valueB) continue;

                const comparison = (() => {
                    if (typeof valueA === 'string' && typeof valueB === 'string') {
                        const trimmedA = valueA.trim();
                        const trimmedB = valueB.trim();

                        if (trimmedA === '' && trimmedB === '') {
                            return 0;
                        }

                        if (trimmedA === '') {
                            return order === 'asc' ? 1 : -1;
                        }

                        if (trimmedB === '') {
                            return order === 'asc' ? -1 : 1;
                        }

                        const dateA = new Date(valueA);
                        const dateB = new Date(valueB);

                        if (!isNaN(dateA) && !isNaN(dateB)) {
                            return order === 'asc' ? dateA - dateB : dateB - dateA;
                        }

                        const partsA = trimmedA.match(/[^\d]+|\d+/g);
                        const partsB = trimmedB.match(/[^\d]+|\d+/g);

                        const minLength = Math.min(partsA.length, partsB.length);

                        for (let i = 0; i < minLength; i++) {
                            const partA = partsA[i];
                            const partB = partsB[i];

                            if (!isNaN(partA) && !isNaN(partB)) {
                                const numA = parseFloat(partA);
                                const numB = parseFloat(partB);
                                if (numA !== numB) {
                                    return order === 'asc' ? numA - numB : numB - numA;
                                }
                            } else {
                                const stringA = String(partA);
                                const stringB = String(partB);
                                const stringComparison = stringA.localeCompare(stringB);
                                if (stringComparison !== 0) {
                                    return order === 'asc' ? stringComparison : -stringComparison;
                                }
                            }
                        }
                        return order === 'asc'
                            ? partsA.length - partsB.length
                            : partsB.length - partsA.length;
                    }
                    const numA = parseFloat(valueA);
                    const numB = parseFloat(valueB);

                    if (!isNaN(numA) && !isNaN(numB)) {
                        return order === 'asc' ? numA - numB : numB - numA;
                    }

                    const stringComparison = String(valueA).localeCompare(String(valueB));
                    return order === 'asc' ? stringComparison : -stringComparison;
                })();
                return comparison;
            }

            return 0;
        })
        .slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const exportToExcel = async () => {
        setExporting(true);

        // Filtra las columnas visibles
        const visibleColumns = columns.filter(
            (column) => !hiddenColumns.includes(column.field) && column.field !== 'acciones'
        );

        // Selecciona solo las columnas necesarias para todas las filas
        const dataToExport = rows.map((row) => {
            const exportedRow = {};
            visibleColumns.forEach((column) => {
                // Check if the column is 'estado'
                if (column.field === 'estado') {
                    // Use 'ACTIVO' if item.estado is true, 'INACTIVO' otherwise
                    exportedRow[column.field] = row[column.field] ? 'ACTIVO' : 'INACTIVO';
                } else {
                    // For other columns, use the value as-is
                    exportedRow[column.field] = row[column.field];
                }
            });
            return exportedRow;
        });

        // Crea un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos');

        // Agrega las cabeceras de las columnas al libro de Excel
        const header = visibleColumns.map((column) => column.header);
        worksheet.addRow(header);

        // Agrega los datos de las filas al libro de Excel
        dataToExport.forEach((row) => {
            const rowData = visibleColumns.map((column) => row[column.field]);
            worksheet.addRow(rowData);
        });

        // Guarda el archivo de Excel
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, fileName);

        setExporting(false);
    };

    const handleSort = (field) => {
        const currentSortOrder = sortOrder[field];
        let newSortOrder = {};

        if (currentSortOrder === 'asc') {
            newSortOrder = { [field]: 'desc' };
        } else if (currentSortOrder === 'desc') {
            newSortOrder = {}; // Desactivar el filtro
        } else {
            newSortOrder = { [field]: 'asc' };
        }

        setSortOrder(newSortOrder);
        setCurrentPage(1);
    };

    const handleRowClick = (row) => {
        if (selectedRows.some((selectedRow) => selectedRow.id === row.id)) {
            setSelectedRows(selectedRows.filter((selectedRow) => selectedRow.id !== row.id));
        } else {
            setSelectedRows([...selectedRows, row]);
        }
        onRowClick(row);
    };

    const renderPageButtons = (start, end) => {
        const pageButtons = [];
        for (let i = start; i <= end; i++) {
            pageButtons.push(
                <button
                    type='button'
                    key={i}
                    className={`mx-1 px-2 py-1 text-xs rounded ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border hover:bg-gray-200 border-gray-200'
                        }`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return pageButtons;
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    // Function to go back to the first page
    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const showPrevButton = currentPage > 1;
    const showNextButton = currentPage < totalPages;

    return (
        <div className='pb-5'>
            {search && (
                <div className='mb-0.5'>
                    <div className='flex'>
                        <input
                            className='w-full border-2 border-blue-600 rounded-md py-2 px-3 text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            type='text'
                            name='buscar'
                            id='buscar'
                            placeholder='Buscar...'
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        {exportable && (
                            <button
                                className='ml-2 px-4 py-2 font-bold text-sm bg-green-600 hover:bg-green-700 text-white rounded-md'
                                onClick={exportToExcel}
                                disabled={exporting}
                            >
                                {exporting ? <BeatLoader size={8} color='white' /> : 'Excel'}
                            </button>
                        )}
                    </div>
                </div>
            )}
            <div className='mb-1 bg-white rounded-lg shadow-md overflow-x-auto'>
                {isLoading ? (
                    <div className='px-4 py-2 text-center text-blue-700'>
                        <BeatLoader size={10} color='rgb(3 105 161)' loading={true} />
                    </div>
                ) : (
                    <>
                        <table className='min-w-full text-sm divide-y divide-gray-200'>
                            <thead className='bg-blue-600 text-white'>
                                <tr>
                                    {columns.map((column) => {
                                        if (hiddenColumns.includes(column.field)) {
                                            return null;
                                        }
                                        return (
                                            <th
                                                scope='col'
                                                className='px-4 py-3 text-left font-medium uppercase'
                                                key={column.field}
                                            >
                                                <button
                                                    className='flex items-center space-x-1 focus:outline-none'
                                                    type='button'
                                                    onClick={() => handleSort(column.field)}
                                                >
                                                    {column.header}
                                                    {sortOrder[column.field] && (
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className={`h-4 w-4 ${sortOrder[column.field] === 'asc'
                                                                ? 'text-white rotate-180'
                                                                : 'text-white'
                                                                }`}
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            stroke='currentColor'
                                                        >
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                                        </svg>
                                                    )}
                                                </button>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {visibleRows.map((row, index) => (
                                    <tr
                                        onClick={() => handleRowClick(row)}
                                        className={`cursor-pointer hover:bg-blue-100 ${row.isSelected ? 'bg-green-300' : ''
                                            }`}
                                        key={index}
                                    >
                                        {columns.map((column) => (
                                            <td className='px-4 py-1 whitespace-nowrap' key={`${index}-${column.field}`}>
                                                {row[column.field]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
            {totalRows > rowsPerPage && (
                <div className='bg-white border rounded-md shadow-md border-gray-200'>
                    <div className='max-w-7xl mx-auto px-4 py-2 sm:px-6'>
                        <div className='flex items-center justify-between'>
                            <div className='text-xs text-gray-700'>
                                Mostrando {startIndex + 1}-{Math.min(endIndex, totalRows)} de {totalRows} resultados
                            </div>
                            <div className='flex'>
                                {currentPage !== 1 && (
                                    <button
                                        type='button'
                                        className='mx-1 px-2 py-1 text-xs rounded bg-white text-blue-600 border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                        onClick={goToFirstPage}
                                    >
                                        ↤
                                    </button>
                                )}
                                {showPrevButton && (
                                    <button
                                        type='button'
                                        className='mx-1 px-2 py-1 text-xs rounded bg-white text-blue-600 border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        ←
                                    </button>
                                )}
                                {renderPageButtons(
                                    Math.max(currentPage - 2, 1),
                                    Math.min(currentPage + 2, totalPages)
                                )}
                                {showNextButton && (
                                    <button
                                        type='button'
                                        className='mx-1 px-2 py-1 text-xs rounded bg-white text-blue-600 border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        →
                                    </button>
                                )}
                                {currentPage !== totalPages && (
                                    <button
                                        type='button'
                                        className='mx-1 px-2 py-1 text-xs rounded bg-white text-blue-600 border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                        onClick={goToLastPage}
                                    >
                                        ↦
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}