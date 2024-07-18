import { useState, useEffect, useCallback } from "react";
import {
  getAll,
  getById,
  create,
  update,
  remove,
  GetAllParams,
} from "../services/api/crudApi";
import { AxiosRequestConfig } from "axios";

interface Entity {
  id?: string;
  productId?: string;
}

interface CustomFetchOptions extends AxiosRequestConfig {
  search?: string;
  page?: number;
  pageSize?: number;
}

interface FetchResult<T> {
  data: T[] | T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  fetchById: (id: string) => Promise<void>;
  createData: (data: T) => Promise<void>;
  updateData: (
    idOrProductId: string,
    updatedData: Partial<T & Entity>
  ) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
}

const useFetch = <T extends Entity>(
  url: string,
  options?: CustomFetchOptions
): FetchResult<T> => {
  const [data, setData] = useState<T[] | T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAll<T[]>(url, options as GetAllParams);
      
      if (!response) {
        throw new Error("Empty response data");
      }

      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [options, url]);
  

  const fetchById = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const response = await getById<T>(`${url}`, id);
        console.log();

        if (!response) {
          throw new Error("Empty response data");
        }
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const createData = useCallback(
    async (newData: T) => {
      try {
        const response = await create<T>(url, newData);
        if (!response) {
          throw new Error("Failed to create data!");
        }
        setData(prevData =>
          Array.isArray(prevData) ? [...prevData, response] : response
        );
        refetch();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    },
    [url, options]
  );

  const updateData = useCallback(
    async (idOrProductId: string, updatedData: Partial<T & Entity>) => {
      try {
        const response = await update<T & Entity>(
          url,
          idOrProductId,
          updatedData
        );
        if (!response) {
          throw new Error("Failed to update data!");
        }
        setData(prevData => {
          if (Array.isArray(prevData)) {
            return prevData.map(item =>
              item.id === idOrProductId || item.productId === idOrProductId
                ? { ...item, ...response }
                : item
            );
          } else if (
            prevData &&
            (prevData.id === idOrProductId ||
              prevData.productId === idOrProductId)
          ) {
            return { ...prevData, ...response };
          }
          return prevData;
        });
        refetch();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    },
    [url, options]
  );

  const deleteData = useCallback(
    async (id: string) => {
      try {
        await remove(url, id);
        refetch();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    },
    [url, options, refetch]
  );

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
    fetchById,
    createData,
    updateData,
    deleteData,
  };
};

export default useFetch;
