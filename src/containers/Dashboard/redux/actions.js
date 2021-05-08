import { GET_USER, SET_USER, UPDATE_USER, DELETE_USER } from "./constants";

export const getUser = (userId, token) => ({
  type: GET_USER,
  userId,
  token,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const updateUser = (userId, token, email, currentPassword, newPassword) => ({
  type: UPDATE_USER,
  userId,
  token,
  email,
  currentPassword,
  newPassword
});

export const deleteUser = (userId, token) => ({
  type: DELETE_USER,
  userId,
  token
});
