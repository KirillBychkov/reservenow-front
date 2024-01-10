/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

interface FetchFunction<T> {
  (): Promise<{ data: T; error: string }>;
}

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  errorMsg: string | null;
  invokeFunction: () => void,
}

interface Options<T> {
  disabled?: boolean,
  onSuccess?: (data: T) => void
  onError?: (err: string) => void
}

function useFetch<T>(
  fetchFunction: FetchFunction<T>,
  dependencies?: any[],
  options?: Options<T>
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setError] = useState<string | null>(null);

  const invokeFunction = () => {
    setData(null)
    setIsLoading(true);
    fetchFunction().then((data) => {
      if (data.error) {
        setError(data.error);
        options?.onError && options.onError(data.error);
      } else {
        setData(data.data);
        options?.onSuccess && options.onSuccess(data.data);
      }
      setIsLoading(false);
    });
  }

  useEffect(() => {
    if (options?.disabled) {
      return;
    }
    invokeFunction()
  }, dependencies || []);

  return { data, isLoading, errorMsg, invokeFunction };
}

export default useFetch;
