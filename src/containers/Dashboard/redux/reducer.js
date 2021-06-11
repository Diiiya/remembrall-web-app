import { 
  SET_USER, 
  USER_UPDATED_SUCCESS, 
  USER_UPDATED_ERROR, 
  DELETE_USER_SUCCESS, 
  DELETE_USER_ERROR,
  SET_USER_TODOS,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_ERROR,
  DO_TODO_SUCCESS,
  DO_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  SET_USER_TAGS,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_ERROR,
  RESET_TYPE,
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
    case CREATE_TODO_SUCCESS:
    case CREATE_TODO_ERROR:
    case DO_TODO_SUCCESS:
    case DO_TODO_ERROR:
    case DELETE_TODO_SUCCESS:
    case DELETE_TODO_ERROR:
    case CREATE_TAG_SUCCESS:
    case CREATE_TAG_ERROR:
    case RESET_TYPE:
      const { type } = action;
      return { ...state, type };
    case SET_USER_TODOS:
      const { userTodos } = action;
      return { ...state, userTodos};
    case SET_USER_TAGS:
      const { userTags } = action;
      return { ...state, userTags};
    default:
      return state;
  }
};
