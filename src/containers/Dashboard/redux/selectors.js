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