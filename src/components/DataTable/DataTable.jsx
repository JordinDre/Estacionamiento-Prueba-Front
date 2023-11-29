import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Body from './Body';

export default function DataTable({ columns, rows, fetchData, initialPage, paginationData, isLoading }) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(initialPage || 1);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [isChangingPage, setIsChangingPage] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(prevOrder => {
                const newOrder = prevOrder === 'asc' ? 'desc' : 'asc';
                fetchData(currentPage, search, field, newOrder);
                return newOrder;
            });
        } else {
            setSortField(field);
            setSortOrder('asc');
            fetchData(currentPage, search, field, 'asc');
        }
    }

    const handleSearch = async (searchTerm) => {
        setIsSearching(true); 
        await fetchData(currentPage, searchTerm, sortField, sortOrder);
        setIsSearching(false); 
    }    

    const debounce = (func, delay) => {
        let debounceTimer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }

    const debouncedSearch = debounce((searchTerm) => {
        handleSearch(searchTerm);
    }, 300);    

    const handlePageChange = async (newPage) => {
        setIsChangingPage(true); 
        try {
            setCurrentPage(newPage);
            await fetchData(newPage, search);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsChangingPage(false); 
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div className="pb-5">
            <>
                <SearchBar search={search} onSearchChange={setSearch} debouncedSearch={debouncedSearch} />            
                    {(isLoading || isChangingPage || isSearching) ? (
                        <Spinner />
                    ) : (
                        <Body columns={columns} rows={rows} onSort={handleSort} sortField={sortField} sortOrder={sortOrder} />
                    )}
                <Pagination paginationData={paginationData}
        isLoading={isLoading} onPageChange={handlePageChange} rowsPerPage={rows.length} />
            </>
        </div>
    );
}
