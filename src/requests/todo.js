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