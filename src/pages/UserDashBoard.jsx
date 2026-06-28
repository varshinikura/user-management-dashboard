import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../api/userApi";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import FilterPopup from "../components/FilterPopup";
import Pagination from "../components/Pagination";

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [limit, setLimit] = useState(10);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      const formattedUsers = data.map((user) => ({
        id: user.id,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ").slice(1).join(" "),
        email: user.email,
        department: user.company.name,
      }));

      setUsers(formattedUsers);
    } catch {
      setError("Failed to fetch users");
    }
  };

  const handleSubmit = async (user) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, user);

        setUsers(
          users.map((item) =>
            item.id === selectedUser.id
              ? { ...user, id: selectedUser.id }
              : item
          )
        );

        setSelectedUser(null);
      } else {
        const newUser = await addUser(user);

        setUsers([
          ...users,
          {
            ...user,
            id: newUser.id || users.length + 1,
          },
        ]);
      }
    } catch {
      setError("Failed to save user");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch {
      setError("Failed to delete user");
    }
  };

  const handleSort = (field) => {
    setSortField(field);
  };

  const handleClearFilters = () => {
    setFilters({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
  };

  let filteredUsers = users.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.department.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  filteredUsers = filteredUsers.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
      user.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.department.toLowerCase().includes(filters.department.toLowerCase())
    );
  });

  if (sortField) {
    filteredUsers = [...filteredUsers].sort((a, b) =>
      String(a[sortField]).localeCompare(String(b[sortField]))
    );
  }

  const paginatedUsers = filteredUsers.slice(0, limit);

  return (
    <div className="container">
      <h1>User Management Dashboard</h1>

      {error && <p className="error-message">{error}</p>}

      <UserForm
        selectedUser={selectedUser}
        onSubmit={handleSubmit}
        onCancel={() => setSelectedUser(null)}
      />

      <div className="top-bar">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />

        <Pagination limit={limit} setLimit={setLimit} />

        <button type="button" onClick={() => setShowFilter(true)}>
          Filter
        </button>
      </div>

      {showFilter && (
        <FilterPopup
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilter(false)}
          onClear={handleClearFilters}
        />
      )}

      <UserTable
        users={paginatedUsers}
        onEdit={setSelectedUser}
        onDelete={handleDelete}
        onSort={handleSort}
      />
    </div>
  );
}

export default UserDashboard;