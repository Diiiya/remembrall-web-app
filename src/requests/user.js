import axios from "axios";

export function requestGetUser(userId, token) {
  return axios.request({
    method: "get",
    url: `https://localhost:5001/users/${userId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function requestCreateUser(username, email, password) {
  return axios.request({
    method: "post",
    url: "https://localhost:5001/users",
    headers: {
    Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    data: {username, email, password}
  })
}

export function requestLoginUser(login, password) {
  return axios.request({
    method: "post",
    url: "https://localhost:5001/users/authenticate",
    headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    },
    data: {login, password}
  })
}

export function requestUpdateUser(userId, token, email, currentPassword, newPassword) {
  let updateData;
  if (newPassword !== ""){
    updateData = {email, currentPassword, newPassword}
  } else {
    updateData = {email, currentPassword}
  }
  return axios.request({
    method: "put",
    url: `https://localhost:5001/users/${userId}`,
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: "Bearer " + token
    },
    data: updateData
  })
}

export function requestDeleteUser(userId, token) {
  return axios.request({
    method: "delete",
    url: `https://localhost:5001/users/${userId}`,
    headers: {
    //  "Accept": "application/json",
    //   "Content-Type": "application/json"
    Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: "Bearer " + token
    },
  })
}
