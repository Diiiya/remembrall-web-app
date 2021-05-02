import { GET_USER, SET_USER } from "./constants";

export const getUser = (userId, token) => ({
  type: GET_USER,
  userId,
  token,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});
