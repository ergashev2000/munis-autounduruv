import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const alertError = (
  message: string,
  options: object = {},
  time: number = 3000
) => {
  toast.error(message, {
    autoClose: time,
    ...options,
  });
};

export const alertWarning = (
  message: string,
  options: object = {},
  time: number = 3000
) => {
  toast.warn(message, {
    autoClose: time,
    ...options,
  });
};

export const alertSuccess = (
  message: string,
  options: object = {},
  time: number = 3000
) => {
  toast.success(message, {
    autoClose: time,
    ...options,
  });
};

export const alertInfo = (
  message: string,
  options: object = {},
  time: number = 3000
) => {
  toast.info(message, {
    autoClose: time,
    ...options,
  });
};
