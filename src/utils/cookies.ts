import Cookies from "js-cookie";

//GET
export const getAccessTokenFromCookie = (name: string): string => {
  const cookieValue = Cookies.get(name);
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
