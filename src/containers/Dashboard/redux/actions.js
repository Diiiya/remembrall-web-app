import { 
  GET_USER, 
  SET_USER, 
  UPDATE_USER, 
  DELETE_USER, 
  GET_USER_TODOS, 
  SET_USER_TODOS,
  CREATE_TODO
} from "./constants";

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

export const getUserTodos = (userId, token) => ({
  type: GET_USER_TODOS,
  userId,
  token
});

export const setUserTodos = (userTodos) => ({
  type: SET_USER_TODOS,
  userTodos,
});

export const createTodo = (userId, description, date, time, location, priority, tag) => ({
  type: CREATE_TODO,
  userId,
  description, 
  date, 
  time, 
  location, 
  priority, 
  tag
});
