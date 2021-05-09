import { call, put } from "redux-saga/effects";
import { setUser, setUserTodos } from "./actions";
import { requestGetUser, requestUpdateUser, requestDeleteUser } from "../../../requests/user";
import { requestGetUserTodos, requestCreateTodo } from "../../../requests/todo";

import { takeLatest } from "redux-saga/effects";
import { 
  GET_USER, 
  UPDATE_USER, 
  USER_UPDATED_SUCCESS, 
  USER_UPDATED_ERROR, 
  DELETE_USER, 
  DELETE_USER_SUCCESS, 
  DELETE_USER_ERROR,
  GET_USER_TODOS,
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_ERROR
 } from "./constants";

export function* watcherSaga() {
  yield takeLatest(GET_USER, handleGetUser);
  yield takeLatest(UPDATE_USER, handleUpdateUser);
  yield takeLatest(DELETE_USER, handleDeleteUser);
  yield takeLatest(GET_USER_TODOS, handleGetUserTodos);
  yield takeLatest(CREATE_TODO, handleCreateTodo);
}

export function* handleGetUser({ userId, token }) {
  try {
    const response = yield call(requestGetUser, userId, token);
    const { data } = response;
    // Puts the data in the right redux action
    yield put(setUser(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleUpdateUser({ userId, token, email, currentPassword, newPassword }) {
  try {
    const response = yield call(requestUpdateUser, userId, token, email, currentPassword, newPassword);
    yield put({ type: USER_UPDATED_SUCCESS, response });
  } catch (error) {
    yield put({ type: USER_UPDATED_ERROR, error });
  }
}

export function* handleDeleteUser({ userId, token }) {
  try {
    const response = yield call(requestDeleteUser, userId, token);
    yield put({ type: DELETE_USER_SUCCESS, response });
  } catch (error) {
    yield put({ type: DELETE_USER_ERROR, error });
  }
}

export function* handleGetUserTodos({ userId, token }) {
  try {
    const response = yield call(requestGetUserTodos, userId, token);
    yield put(setUserTodos(response));
  } catch (error) {
    console.log(error);
  }
}

export function* handleCreateTodo({ userId, description, date, time, location, priority, tag }) {
  try {
    const response = yield call(requestCreateTodo, userId, description, date, time, location, priority, tag);
    yield put({ type: CREATE_TODO_SUCCESS, response });
  } catch (error) {
    yield put({ CREATE_TODO_ERROR, error });
  }
}
