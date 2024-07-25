import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function handleError(
  error: unknown,
  defaultMessage: string = "Kutilmagan xatolik yuz berdi!"
) {
  console.log("Caught error:", error);
  console.log("Error type:", typeof error);
  console.log("Error keys:", error ? Object.keys(error) : "N/A");

  if (error instanceof Error) {
    toast.error(error.message);
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    toast.error((error as { message: string }).message);
  } else {
    toast.error(defaultMessage);
  }
}
