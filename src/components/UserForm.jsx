import { useState, useEffect } from "react";
import { validateUser } from "../utils/validation";

function UserForm({ selectedUser, onSubmit, onCancel }) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    } else {
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateUser(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(user);

      setUser({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });

      setErrors({});
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{selectedUser ? "Edit User" : "Add User"}</h2>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={user.firstName}
        onChange={handleChange}
      />
      <p className="error">{errors.firstName}</p>

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={user.lastName}
        onChange={handleChange}
      />
      <p className="error">{errors.lastName}</p>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
      />
      <p className="error">{errors.email}</p>

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={user.department}
        onChange={handleChange}
      />
      <p className="error">{errors.department}</p>

      <button type="submit">
        {selectedUser ? "Update User" : "Add User"}
      </button>

      {selectedUser && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default UserForm;