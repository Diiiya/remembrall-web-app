import axios from "axios";

export function requestGetUserTags(userId, token) {
    return axios.request({
      method: "get",
      url: `https://localhost:5001/tags/user/${userId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
}

export function requestCreateTag(fkUserId, tagName, tagColor, token) {
    return axios.request({
      method: "post",
      url: "https://localhost:5001/tags",
      headers: {
      Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: "Bearer " + token,
      },
      data: {fkUserId, tagName, tagColor}
    });
}