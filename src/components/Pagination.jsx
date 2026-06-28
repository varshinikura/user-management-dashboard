function Pagination({ limit, setLimit }) {
  return (
    <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
      <option value={10}>10 Users</option>
      <option value={25}>25 Users</option>
      <option value={50}>50 Users</option>
      <option value={100}>100 Users</option>
    </select>
  );
}

export default Pagination;