function UserTable({ users, onEdit, onDelete, onSort }) {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort("id")}>ID</th>
          <th onClick={() => onSort("firstName")}>First Name</th>
          <th onClick={() => onSort("lastName")}>Last Name</th>
          <th onClick={() => onSort("email")}>Email</th>
          <th onClick={() => onSort("department")}>Department</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.department}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;