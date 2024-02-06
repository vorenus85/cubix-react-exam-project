import axios from "axios";

const BASE_URL = "https://janos-perge-react-wallet.janos-perge.workers.dev";

export const AXIOS_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

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
