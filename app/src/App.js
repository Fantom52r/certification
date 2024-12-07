import { useEffect, useState } from "react";
import axios from "axios";
import UserList from "./components/UserList";
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("asc");
  const [sortOrder, setSortOrder] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/search/users",
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
            params: {
              q: searchTerm,
              sort: "repositories",
              order: sortOrder,
              page,
              per_page: 10,
            },
          }
        );
        setUsers(response.data.items);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    getUsersData();
  }, [page, searchTerm, sortOrder]);
  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Search for users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
        <button
          onClick={() =>
            setSortOrder(sortOrder.includes("asc") ? "desc" : "asc")
          }
        >
          Sort by {sortOrder[0] === "asc" ? "descending" : "ascending"}
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        {page}
        <button disabled={users.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {users.map((user) => (
        <UserList user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      ))}
    </div>
  );
}

export default App;
