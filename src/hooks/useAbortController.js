import { useEffect, useRef } from "react";

export const useAbortController = () => {
  const abortController = useRef(new AbortController());

  useEffect(
    () => () => {
      abortController.current.abort();
    },
    []
  );

  return {
    signal: abortController.current.signal,
    abort: () => {
      abortController.current.abort();
      abortController.current = new AbortController();
    },
  };
};
