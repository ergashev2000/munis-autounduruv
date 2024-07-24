export interface ApiError {
  message: string;
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any): ApiError => {
  const response = error.response || {};
  return {
    message: response.data?.message || error.message,
    status: response.status || 500,
    details: response.data || {},
  };
};
