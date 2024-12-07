import React from 'react'

const UserList = ({user,setSelectedUser,selectedUser}) => {
  return (
    <div>
      <div key={user.id}>
          <img src={user.avatar_url} alt={user.login} />
          <h2 onClick={() => setSelectedUser(user)}>{user.login}</h2>
          <p>Followers: {user.followers}</p>
          {selectedUser && selectedUser.id===user.id && (
            <p>
              "url": {user.url},<p>"html_url": {user.url}</p>,
              <p>"followers_url": {user.followers_url}</p> ,
              <p>"following_url": {user.following_url}</p>
            </p>
          )}
        </div>
    </div>
  )
}

export default UserList
