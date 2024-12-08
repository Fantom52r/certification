import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserList from "./UserList";

const mockUser = {
  id: 1,
  login: "testuser",
  avatar_url: "https://example.com/avatar.jpg",
  url: "https://example.com/user",
  html_url: "https://example.com/user",
  followers_url: "https://example.com/followers",
  following_url: "https://example.com/following",
  followers: 100,
};

test("renders UserList component correctly", () => {
  const setSelectedUser = jest.fn();

  render(
    <UserList
      user={mockUser}
      setSelectedUser={setSelectedUser}
      selectedUser={null}
    />
  );



  fireEvent.click(screen.getByText("testuser"));
  expect(setSelectedUser).toHaveBeenCalledWith(mockUser);
});

test("displays selected user details", () => {
  render(
    <UserList
      user={mockUser}
      setSelectedUser={() => {}}
      selectedUser={mockUser}
    />
  );


});
