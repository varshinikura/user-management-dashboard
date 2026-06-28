function SearchBar({ searchText, setSearchText }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search by name, email, or department..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
}

export default SearchBar;