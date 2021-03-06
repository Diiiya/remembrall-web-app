import { call, put } from "redux-saga/effects";
import { setUser, setUserTags, setUserTodos } from "./actions";
import { requestGetUser, requestUpdateUser, requestDeleteUser } from "../../../requests/user";
import { requestGetUserTodos, requestCreateTodo, requestUpdateDoneTodo, requestDeleteTodo } from "../../../requests/todo";
import { requestCreateTag, requestGetUserTags } from "../../../requests/tag";

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
  CREATE_TODO_ERROR,
  DO_TODO,
  DO_TODO_SUCCESS,
  DO_TODO_ERROR,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,

  GET_USER_TAGS,
  CREATE_TAG,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_ERROR,
 } from "./constants";

export function* watcherSaga() {
  yield takeLatest(GET_USER, handleGetUser);
  yield takeLatest(UPDATE_USER, handleUpdateUser);
  yield takeLatest(DELETE_USER, handleDeleteUser);
  yield takeLatest(GET_USER_TODOS, handleGetUserTodos);
  yield takeLatest(CREATE_TODO, handleCreateTodo);
  yield takeLatest(GET_USER_TAGS, handleGetUserTags);
  yield takeLatest(CREATE_TAG, handleCreateTag);
  yield takeLatest(DO_TODO, handlePatchTodo);
  yield takeLatest(DELETE_TODO, handleDeleteTodo);
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

export function* handleCreateTodo({ userId, description, dateTime, location, priority, tag, token }) {
  try {
    const response = yield call(requestCreateTodo, userId, description, dateTime, location, priority, tag, token);
    yield put({ type: CREATE_TODO_SUCCESS, response });
  } catch (error) {
    yield put({ CREATE_TODO_ERROR, error });
  }
}

export function* handlePatchTodo({ todoId, token }) {
  try {
    const response = yield call(requestUpdateDoneTodo, todoId, token);
    yield put({ type: DO_TODO_SUCCESS, response });
  } catch (error) {
    yield put({ type: DO_TODO_ERROR, error });
  }
}

export function* handleDeleteTodo({ todoId, token }) {
  try {
    const response = yield call(requestDeleteTodo, todoId, token);
    yield put({ type: DELETE_TODO_SUCCESS, response });
  } catch (error) {
    yield put({ type: DELETE_TODO_ERROR, error });
  }
}

export function* handleGetUserTags({ userId, token }) {
  try {
    const response = yield call(requestGetUserTags, userId, token);
    yield put(setUserTags(response));
  } catch (error) {
    console.log(error);
  }
}

export function* handleCreateTag({ userId, tagName, tagColor, token }) {
  try {
    const response = yield call(requestCreateTag, userId, tagName, tagColor, token);
    yield put({ type: CREATE_TAG_SUCCESS, response });
  } catch (error) {
    yield put({ CREATE_TAG_ERROR, error });
  }
}

