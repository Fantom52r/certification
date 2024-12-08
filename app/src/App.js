import React from "react";
import { useEffect, useState } from "react";
import UserList from "./components/UserList";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${searchTerm || "type:user"}&sort=repositories&order=${sortOrder}&page=${page}&per_page=10`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
          }
        );

        if (!response.ok) {
          throw new Error;
        }

        const data = await response.json();
        setUsers(data.items || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, searchTerm, sortOrder]);

  return (
    <div className="app-container">
      <div className="search-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search for users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn search-btn" onClick={() => setPage(1)}>
          Search
        </button>
        <button
          className="btn sort-btn"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          Sort by {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
      </div>
      <div className="pagination">
        <button
          className="btn page-btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="page-number">Page {page}</span>
        <button
          className="btn page-btn"
          disabled={users.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error.message}</p>}
      <div className="user-list">
        {users.map((user) => (
          <UserList
            key={user.id}
            user={user}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        ))}
      </div>
    </div>
  );
}

export default App;