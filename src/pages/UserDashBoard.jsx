import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser } from "../api/userApi";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");

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

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleSort = (field) => {
    console.log(field);
  };

  return (
    <div className="container">
      <h1>User Management Dashboard</h1>

      {error && <p className="error-message">{error}</p>}

      <UserForm
        selectedUser={selectedUser}
        onSubmit={handleSubmit}
        onCancel={() => setSelectedUser(null)}
      />

      <UserTable
        users={users}
        onEdit={setSelectedUser}
        onDelete={handleDelete}
        onSort={handleSort}
      />
    </div>
  );
}

export default UserDashboard;