import { useState } from "react";
import UserForm from "../components/UserForm";

function UserDashboard() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSubmit = (user) => {
    console.log(user);
  };

  return (
    <div className="container">
      <h1>User Management Dashboard</h1>

      <UserForm
        selectedUser={selectedUser}
        onSubmit={handleSubmit}
        onCancel={() => setSelectedUser(null)}
      />
    </div>
  );
}

export default UserDashboard;