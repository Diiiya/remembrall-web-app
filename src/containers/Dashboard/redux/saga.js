import { call, put } from "redux-saga/effects";
import { setUser } from "./actions";
import { requestGetUser, requestUpdateUser, requestDeleteUser } from "../../../requests/user";

import { takeLatest } from "redux-saga/effects";
import { GET_USER, UPDATE_USER, USER_UPDATED_SUCCESS, USER_UPDATED_ERROR, DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_ERROR } from "./constants";

export function* watcherSaga() {
  yield takeLatest(GET_USER, handleGetUser);
  yield takeLatest(UPDATE_USER, handleUpdateUser);
  yield takeLatest(DELETE_USER, handleDeleteUser);
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
