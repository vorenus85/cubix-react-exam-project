import axios from "axios";

const BASE_URL = "https://janos-perge-react-wallet.janos-perge.workers.dev";

export const AXIOS_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

let authToken = false;

export function setApiToken(newToken) {
  authToken = newToken;
}

export function doApiCall(
  method,
  uri,
  onSuccess,
  onFailure = false,
  data = {}
) {
  axios({
    method,
    url: `${BASE_URL}${uri}`,
    data,
    headers:
      authToken !== false ? { Authorization: `Bearer ${authToken}` } : {},
  })
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      console.log(err);
      if (onFailure === false) {
        return;
      }
      onFailure(err?.response?.data?.error, err);
    });
}
