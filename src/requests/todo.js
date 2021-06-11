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

export function requestCreateTodo(fkUserId, description, dateTime, location, priorityVal, fkTagIdVal, token) {
  let priority = priorityVal !== undefined && priorityVal !== null && priorityVal !== ""  ? priorityVal : null;
  let fkTagId = fkTagIdVal !== undefined && fkTagIdVal !== null && fkTagIdVal !== "" ? fkTagIdVal : null;
  return axios.request({
    method: "post",
    url: "https://localhost:5001/todos",
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: "Bearer " + token,
    },
    data: {fkUserId, description, dateTime, location, priority, fkTagId}
  });
}

export function requestDeleteTodo(todoId, token) {
  return axios.request({
    method: "delete",
    url: `https://localhost:5001/todos/${todoId}`,
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: "Bearer " + token
    },
  })
}

export function requestUpdateDoneTodo(todoId, token) {
  return axios.request({
    method: "patch",
    url: `https://localhost:5001/todos/${todoId}`,
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: "Bearer " + token
    }
  })
}