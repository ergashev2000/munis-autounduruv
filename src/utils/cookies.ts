import Cookies from "js-cookie";

//GET
export const getAccessTokenFromCookie = (): string => {
  const cookieValue = Cookies.get("accessToken");
  let accessToken: string = "";

  if (cookieValue) {
    try {
      const parsedToken = JSON.parse(cookieValue);
      accessToken = parsedToken.accessToken?.token || "";
    } catch (error) {
      accessToken = cookieValue;
    }
  }

  return accessToken;
};

export const getValueFromCookie = (
  name: string
): Record<string, boolean> | null => {
  const cookieValue = Cookies.get(name);

  if (cookieValue) {
    try {
      const parsedValue = JSON.parse(cookieValue);
      return parsedValue;
    } catch (error) {
      console.error("Error parsing cookie value:", error);
      return null;
    }
  } else {
    return null;
  }
};

//SET
export const setCookie = (
  name: string,
  value: string | object,
  options?: Cookies.CookieAttributes
): void => {
  const valueToStore =
    typeof value === "object" ? JSON.stringify(value) : value;
  Cookies.set(name, valueToStore, options);
};

//DELETE
export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};
