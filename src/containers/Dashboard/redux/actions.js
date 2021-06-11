import { 
  GET_USER, 
  SET_USER, 
  UPDATE_USER, 
  DELETE_USER, 
  GET_USER_TODOS, 
  SET_USER_TODOS,
  CREATE_TODO,
  DO_TODO,
  GET_USER_TAGS,
  SET_USER_TAGS,
  CREATE_TAG,
  DELETE_TODO,
  RESET_TYPE,
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

export const createTodo = (userId, description, dateTime, location, priority, tag, token) => ({
  type: CREATE_TODO,
  userId,
  description, 
  dateTime: dateTime ? dateTime : "0001-01-01T00:00:00+00:00",
  location, 
  priority, 
  tag,
  token
});

export const patchTodo = (todoId, token) => ({
  type: DO_TODO,
  todoId,
  token,
});

export const deleteTodo = (todoId, token) => ({
  type: DELETE_TODO,
  todoId,
  token
});

export const getUserTags = (userId, token) => ({
  type: GET_USER_TAGS,
  userId,
  token
});

export const setUserTags = (userTags) => ({
  type: SET_USER_TAGS,
  userTags,
});

export const createTag = (userId, tagName, tagColor, token) => ({
  type: CREATE_TAG,
  userId,
  tagName, 
  tagColor,
  token
});

export const resetTypeValue = () => ({
  type: RESET_TYPE
})
