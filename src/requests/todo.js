import axios from "axios";

export function requestGetUserTodos(userId, token) {
  return axios.request({
    method: "get",
    url: `https://localhost:5001/todos/user/${userId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function requestCreateTodo(fkUserId, description, date, time, location, priority, fkTagId) {
  return axios.request({
    method: "post",
    url: "https://localhost:5001/todos",
    headers: {
    Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    data: {fkUserId, description, date, time, location, priority, fkTagId}
  });
}