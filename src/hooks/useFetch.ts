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

class CustomError extends Error {
  details?: {
    message?: string;
  };

  constructor(message: string, details?: { message?: string }) {
    super(message);
    this.details = details;
  }
}

interface Entity {
  id?: string;
  productId?: string;
}

interface CustomFetchOptions extends AxiosRequestConfig {
  search?: string;
  page?: number;
  pageSize?: number;
}

interface PaginatedData<T> {
  pageCount: number;
  currentPage: number;
  total: number;
  data: T[];
}

interface FetchResult<T> {
  data: PaginatedData<T> | T | null;
  loading: boolean;
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
  const [data, setData] = useState<PaginatedData<T> | T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAll<PaginatedData<T>>(
        url,
        options as GetAllParams
      );

      if (!response) {
        throw new Error("Empty response data");
      }

      setData(response);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [options, url]);

  const fetchById = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const response = await getById<T>(`${url}`, id);

        if (!response) {
          throw new Error("Empty response data");
        }
        setData(response);
      } catch (err) {
        console.log(err);
        throw err;
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
          throw new CustomError("Failed to create data!");
        }

        refetch();
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    [url, options, refetch]
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
        refetch();
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    [url, options, refetch]
  );

  const deleteData = useCallback(
    async (id: string) => {
      try {
        await remove(url, id);
        refetch();
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    [url, options, refetch]
  );

  useEffect(() => {
    fetchData();
  }, [options?.search]);

  return {
    data,
    loading,
    refetch,
    fetchById,
    createData,
    updateData,
    deleteData,
  };
};

export default useFetch;
