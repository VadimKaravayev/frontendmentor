import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => {
          console.log("err", err);
          setError(err);
        })
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );
  console.log("error from useThunk", error);
  return [runThunk, isLoading, error];
}
