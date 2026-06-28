function FilterPopup({ filters, setFilters, onClose, onClear }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="popup">
      <div className="popup-box">
        <h3>Filter Users</h3>

        <input
          type="text"
          name="firstName"
          placeholder="Filter by First Name"
          value={filters.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Filter by Last Name"
          value={filters.lastName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="email"
          placeholder="Filter by Email"
          value={filters.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Filter by Department"
          value={filters.department}
          onChange={handleChange}
        />

        <button type="button" onClick={onClear}>
          Clear
        </button>

        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default FilterPopup;