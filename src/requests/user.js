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
