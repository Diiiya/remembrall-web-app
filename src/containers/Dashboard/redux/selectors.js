/**
 * User selectors
 */

 import { createSelector } from 'reselect';
 import get from 'lodash/get';
 
/**
* Direct selector to the user state domain
*/
export const selectUserDomain = (state) => state.user;

/**
*  User selector
*/
export const userSelector = createSelector(
  selectUserDomain,
  (substate) => {
    const user = get(substate, 'user');
    return user;
  }
);

/**
*  Update User result selector
*/
  export const userUpdateSelector = createSelector(
  selectUserDomain,
  (substate) => {
    const type = get(substate, 'type');
    if (type === "USER_UPDATED_SUCCESS") {
      return true;
    }
    return false;
  }
);

/**
*  Delete User result selector
*/
export const userDeleteSelector = createSelector(
  selectUserDomain,
  (substate) => {
    const type = get(substate, 'type');
    if (type === "DELETE_USER_SUCCESS") {
      return true;
    }
    return false;
  }
);

/**
*  Get User todos selector
*/
export const userTodosSelector = createSelector(
  selectUserDomain,
  (substate) => {
    return get(substate, 'userTodos');
  }
);

/**
*  Create todo result selector
*/
export const todoCreateSelector = createSelector(
  selectUserDomain,
  (substate) => {
    const type = get(substate, 'type');
    if (type === "CREATE_TODO_SUCCESS") {
      return true;
    }
    return false;
  }
);