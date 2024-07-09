export interface ApiError {
  message: string;
  status: number;
  details?: any;
}

export const handleError = (error: any): ApiError => {
  const response = error.response || {};
  return {
    message: response.data?.message || error.message,
    status: response.status || 500,
    details: response.data || {},
  };
};
