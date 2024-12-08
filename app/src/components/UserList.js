import React from "react";

const UserList = ({ user, setSelectedUser, selectedUser }) => {
  return (
    <div className="user-card">
      <img
        className="user-avatar"
        src={user.avatar_url}
        alt={user.login}
      />
      <h2
        className="user-name"
        onClick={() => setSelectedUser(user)}
      >
        {user.login}
      </h2>
      <p className="user-followers">Followers: {user.followers}</p>
      {selectedUser && selectedUser.id === user.id && (
        <div className="selected-details">
          <p>
            <strong>URL:</strong>{" "}
            <a href={user.url} target="_blank" rel="noopener noreferrer">
              {user.url}
            </a>
          </p>
          <p>
            <strong>HTML URL:</strong>{" "}
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.html_url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserList;
