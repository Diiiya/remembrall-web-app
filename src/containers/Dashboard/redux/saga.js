import { call, put } from "redux-saga/effects";
import { setUser } from "./actions";
import { requestGetUser } from "../../../requests/user";

import { takeLatest } from "redux-saga/effects";
import { GET_USER } from "./constants";

export function* watcherSaga() {
  yield takeLatest(GET_USER, handleGetUser);
}

export function* handleGetUser({ userId, token }) {
  console.log("userId saga ", userId);
  console.log("token saga ", token);
  try {
    const response = yield call(requestGetUser, userId, token);
    const { data } = response;
    // Puts the data in the right redux action
    yield put(setUser(data));
  } catch (error) {
    console.log(error);
  }
}
