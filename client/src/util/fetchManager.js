const API_URL = process.env.API_URL;

const options = {
  headers: {
    "Content-Type": "application/json",
    "X-ACCESS-TOKEN": localStorage.getItem("token"),
  },
};

const getOptions = { ...options, method: "GET" };
const postOptions = { ...options, method: "POST" };
const deleteOptions = {
  ...options,
  method: "DELETE",
  "Access-Control-Allow-Origin": "*",
};
const patchOptions = { ...options, method: "PATCH" };

function getFetchManger(url) {
  return fetch(API_URL + url, getOptions)
    .then((res) => res.json())
    .catch((e) => console.log(e));
}

function postFetchManger(url, body) {
  postOptions["body"] = JSON.stringify(body);
  return fetch(API_URL + url, postOptions);
}

function deleteFetchManager(url, body) {
  if (body) deleteOptions["body"] = JSON.stringify(body);
  return fetch(API_URL + url, deleteOptions)
    .then((res) => res)
    .catch((e) => console.log(e));
}

function patchFetchManger(url, body) {
  patchOptions["body"] = JSON.stringify(body);
  return fetch(API_URL + url, patchOptions);
}

export {
  getFetchManger,
  postFetchManger,
  deleteFetchManager,
  patchFetchManger,
};
