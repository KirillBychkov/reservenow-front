import { useState, useEffect } from 'react';

interface FetchFunction<T> {
  (): Promise<{ data: T; error: string }>;
}

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  errorMsg: string | null;
}

function useFetch<T>(fetchFunction: FetchFunction<T>): UseFetchResult<T> {
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
  }, [fetchFunction]);

  return { data, isLoading, errorMsg };
}

export default useFetch;
