export default function Pagination({ paginationData, onPageChange, rowsPerPage }) {

    const generatePaginationNumbers = (currentPage, lastPage) => {
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(lastPage, currentPage + 2);
        while (startPage > 1 && (endPage - startPage) < 4) {
            startPage--;
        }
        while (endPage < lastPage && (endPage - startPage) < 4) {
            endPage++;
        }
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }
    const paginationNumbers = generatePaginationNumbers(paginationData.currentPage, paginationData.lastPage);

    const PaginationButton = ({ label, onClick, active = false }) => {
        const baseClass = 'mx-1 px-2 md:px-3 py-1 text-sm md:text-md rounded border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
        const activeClass = 'bg-blue-600 text-white hover:bg-blue-800 px-2';
        const inactiveClass = 'bg-white text-blue-600';

        return (
            <button
                onClick={onClick}
                className={`${baseClass} ${active ? activeClass : inactiveClass}`}>
                {typeof label === 'number' ? label : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">{label}</svg>}
            </button>
        );
    };

    return (
        <div className='bg-white border rounded-md shadow-md border-gray-200'>
            <div className='max-w-7xl mx-auto px-4 py-2 sm:px-6'>
                <div className='md:flex md:flex-row md:items-center md:justify-between flex flex-col items-center'>
                    <div className='my-2 md:my-0 text-sm text-gray-700'>
                        Resultados Obtenidos {paginationData.total} 
                    </div>
                    <div className='flex'>
                        {paginationData.currentPage !== 1 && (
                            <PaginationButton onClick={() => onPageChange(1)} label={<path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />} />
                        )}
                        {paginationData.currentPage > 1 && (
                            <PaginationButton onClick={() => onPageChange(paginationData.currentPage - 1)} label={<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />} />
                        )}
                        {paginationNumbers.map((num, index) => (
                            <PaginationButton
                                key={index}
                                active={paginationData.currentPage === num}
                                onClick={() => onPageChange(num)}
                                label={num}
                            />
                        ))}
                        {paginationData.currentPage < paginationData.lastPage && (
                            <PaginationButton onClick={() => onPageChange(paginationData.currentPage + 1)} label={<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />} />
                        )}
                        {paginationData.currentPage !== paginationData.lastPage && (
                            <PaginationButton onClick={() => onPageChange(paginationData.lastPage)} label={<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

