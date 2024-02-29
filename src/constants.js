export const BASE_URL =
  "https://janos-perge-react-wallet.janos-perge.workers.dev";
export const AXIOS_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const AUTH_TOKEN = localStorage.getItem("authToken") || false;

export const MODALS = {
  NONE: "NONE",
  CONFIRM: "CONFIRM",
  TRANSACTION: "TRANSACTION",
};
