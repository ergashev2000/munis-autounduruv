import axios from "axios";
import { getAccessTokenFromCookie } from "./cookies";

export const audioDownloader = async (
  url: string,
  setDownloadLoading?: (loading: boolean) => void
): Promise<string | null> => {
  const accessToken = getAccessTokenFromCookie();

  if (setDownloadLoading) {
    setDownloadLoading(true);
  }

  try {
    if (!accessToken) {
      throw new Error("Authentication token not found");
    }

    const params: { [key: string]: string } = {};

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/audio/${url}`,
      {
        params,
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const contentType = response.headers["content-type"];

    const blob = new Blob([response.data], {
      type: contentType,
    });

    const audioUrl = window.URL.createObjectURL(blob);

    return audioUrl;
  } catch (error) {
    console.error("Error downloading file:", error);
    return null;
  } finally {
    if (setDownloadLoading) {
      setDownloadLoading(false);
    }
  }
};
