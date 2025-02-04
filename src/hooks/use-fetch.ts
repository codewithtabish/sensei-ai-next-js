import { useState } from "react";
import { toast } from "sonner";

type FetchCallback<T> = (...args: any[]) => Promise<T>;

function useFetch<T>(cb: FetchCallback<T>) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: Parameters<FetchCallback<T>>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        toast.error(error.message);
      } else {
        setError(new Error("An unknown error occurred"));
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
}

export default useFetch;
