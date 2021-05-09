import { 
  SET_USER, 
  USER_UPDATED_SUCCESS, 
  USER_UPDATED_ERROR, 
  DELETE_USER_SUCCESS, 
  DELETE_USER_ERROR,
  SET_USER_TODOS
 } from "./constants";

const initialState = {
  user: undefined,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const { user } = action;
      return { ...state, user };
    case USER_UPDATED_SUCCESS:
    case USER_UPDATED_ERROR:
    case DELETE_USER_SUCCESS:
    case DELETE_USER_ERROR:
      const { type } = action;
      return { ...state, type };
    case SET_USER_TODOS:
      const { userTodos } = action;
      return { ...state, userTodos};
    default:
      return state;
  }
};
