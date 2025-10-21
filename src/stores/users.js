import { writable } from "svelte/store";

export const users = writable(JSON.parse(localStorage.getItem("users")) || []);

users.subscribe((value) => {
  localStorage.setItem("users", JSON.stringify(value));
});

export const addUser = (user) => {
  users.update((currentUsers) => {
    return [...currentUsers, user];
  });
};

export const editUser = (updatedUser) => {
  users.update((currentUsers) => {
    return currentUsers.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
  });
};

export const deleteUser = (userId) => {
  users.update((currentUsers) => {
    return currentUsers.filter((user) => user.id !== userId);
  });
};

export const getUsers = () => {
  let currentUsers;
  users.subscribe((value) => {
    currentUsers = value;
  })();
  return currentUsers;
};
