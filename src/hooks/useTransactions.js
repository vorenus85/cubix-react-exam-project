import { useCallback, useEffect, useState } from "react";
import { AXIOS_METHOD, doApiCall } from "./useApi";

export default function useTransactions(wallet_id = "", limit = 5) {
  const [cursor, setCursor] = useState("");
  const [transactions, setTransactions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const apiCallCallback = useCallback(
    (newCursor) => {
      setLoading(true);
      doApiCall(
        AXIOS_METHOD.POST,
        "/transactions",
        (responseData) => {
          setTimeout(() => {
            setTransactions((oldTransactions) => {
              if (oldTransactions === false || newCursor === "") {
                console.log("első 5");
                return responseData?.transactions;
              }
              console.log("hozzáfűz");
              return [...oldTransactions, ...responseData?.transactions];
            });
            setCursor(responseData?.cursor);
            setHasMore(responseData?.has_more);
            setError(false);
            setLoading(false);
          }, 250);
        },
        (errorMessage) => {
          setError(errorMessage);
          setTransactions(false);
          setHasMore(true);
          setCursor("");
          setLoading(false);
        },
        {
          wallet_id,
          limit,
          cursor: newCursor,
        }
      );
    },
    [setTransactions, setError, setLoading, setHasMore, wallet_id, limit]
  );

  const resetList = useCallback(() => {
    console.log("resetList");
    apiCallCallback("");
  }, [apiCallCallback]);

  useEffect(() => {
    resetList();
  }, [resetList]);

  const onLoadMore = useCallback(() => {
    apiCallCallback(cursor);
  }, [apiCallCallback, cursor]);

  return [transactions, loading, error, onLoadMore, hasMore, resetList];
}