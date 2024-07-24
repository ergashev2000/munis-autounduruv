import axiosInstance from "../../config/axiosInstance";
import { handleError } from "../utils";

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, ApiResponse<any>>();

export interface GetAllParams {
  page?: number;
  limit?: number;
  search?: string;
  month?: string;
}

export const getAll = async <T>(
  endpoint: string,
  params?: GetAllParams
): Promise<T> => {
  try {
    let requestUrl = endpoint;
    const queryParams: string[] = [];
    if (params) {
      const { page, limit, search, month } = params;
      if (page !== undefined && limit !== undefined) {
        queryParams.push(`page=${page}`, `limit=${limit}`);
      }
      if (search) {
        queryParams.push(`search=${encodeURIComponent(search)}`);
      }
      if (month) {
        queryParams.push(`month=${encodeURIComponent(month)}`);
      }
    }
    if (queryParams.length > 0) {
      requestUrl += `?${queryParams.join("&")}`;
    }
    if (cache.has(requestUrl)) {
      cache.delete(requestUrl);
    }
    const response = await axiosInstance.get(requestUrl);

    const responseData = response.data?.data;

    cache.set(requestUrl, responseData);
    return responseData;
  } catch (error) {
    throw handleError(error);
  }
};

export const getById = async <T>(
  endpoint: string,
  id: string | number
): Promise<T> => {
  const requestUrl = `${endpoint}/${id}`;
  if (cache.has(requestUrl)) {
    return cache.get(requestUrl)?.data as T;
  }
  try {
    const response = await axiosInstance.get(requestUrl);
    const responseData = response.data;
    cache.set(requestUrl, response.data);
    return responseData;
  } catch (error) {
    throw handleError(error);
  }
};

export const create = async <T>(endpoint: string, data: T): Promise<T> => {
  try {
    const response = await axiosInstance.post<ApiResponse<T>>(endpoint, data);
    const responseData = response.data.data;
    cache.clear();
    return responseData;
  } catch (error) {
    throw handleError(error);
  }
};

export const update = async <T>(
  endpoint: string,
  id: string | number,
  data: Partial<T>
): Promise<T> => {
  const requestUrl = `${endpoint}/${id}`;
  try {
    const response = await axiosInstance.patch<ApiResponse<T>>(
      requestUrl,
      data
    );
    const responseData = response.data.data;
    cache.clear();
    return responseData;
  } catch (error) {
    throw handleError(error);
  }
};

export const remove = async (
  endpoint: string,
  id: string | number
): Promise<void> => {
  const requestUrl = `${endpoint}/${id}`;
  try {
    await axiosInstance.delete(requestUrl);
    cache.clear();
  } catch (error) {
    throw handleError(error);
  }
};

export const createMultipart = async <T>(
  endpoint: string,
  data: T
): Promise<T> => {
  try {
    const response = await axiosInstance.post<ApiResponse<T>>(endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);

    const responseData = response.data.data;
    cache.clear();
    return responseData;
  } catch (error) {
    throw handleError(error);
  }
};
