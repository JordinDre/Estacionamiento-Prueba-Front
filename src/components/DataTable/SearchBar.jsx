export default function SearchBar({ search, onSearchChange, debouncedSearch }) {
    return (
        <div className="flex mb-0.5">
            <input
                type="text"
                value={search}
                onChange={(e) => {
                    const newSearchTerm = e.target.value;
                    onSearchChange(newSearchTerm);
                    debouncedSearch(newSearchTerm);
                }}
                placeholder="Buscar..."
                className="w-full border-2 border-blue-600 rounded-md py-2 px-3 text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
}
