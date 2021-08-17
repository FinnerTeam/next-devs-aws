import { useState, useCallback, useRef, useEffect } from "react";
export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      setErrors([]);
      try {
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });
        const responseData = await response.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqController) => reqController !== httpAbortController
        );
        if (responseData?.validErrors?.length > 0) {
          setIsLoading(false);
          setErrors((previousState) => [
            ...previousState,
            responseData?.validErrors,
          ]);
          throw new Error(response.message);
        }
        if (!response.ok) {
          setIsLoading(false);
          setErrors((previousState) => [
            ...previousState,
            responseData.message,
          ]);
          throw new Error(response.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setErrors((previousState) => [...previousState, err.message]);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((request) => request.abort());
    };
  }, []);
  return { isLoading, errors, sendRequest };
};
