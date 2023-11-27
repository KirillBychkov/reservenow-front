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
}

function useFetch<T>(
  fetchFunction: FetchFunction<T>,
  dependencies?: any[],
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFunction().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setData(data.data);
      }
      setIsLoading(false);
    });
  }, dependencies || []);

  return { data, isLoading, errorMsg };
}

export default useFetch;
