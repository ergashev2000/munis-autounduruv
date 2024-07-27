import { useNavigate } from "react-router-dom";
import { message } from "antd";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getAccessTokenFromCookie,
  removeCookie,
  setCookie,
} from "@utils/cookies";
import { UserType } from "../types/UserType";
import axiosInstance from "../config/axiosInstance";

type AuthContextType = {
  user: UserType | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};

const initialUser: UserType | null = null;

export const AuthContext = createContext<AuthContextType>({
  user: initialUser,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: false,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const getMe = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/me");
      setUser(data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Foydalanuvchi ma'lumotlarini yuklashda xatolik:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = getAccessTokenFromCookie();
    if (accessToken) {
      getMe().catch(error =>
        console.error("Failed to fetch user data:", error)
      );
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const { accessToken, refreshToken } = data.data;

      if (accessToken && refreshToken) {
        setCookie("accessToken", accessToken.token, {
          expires: new Date(accessToken.expiresIn),
        });
        setCookie("refreshToken", refreshToken.token, {
          expires: new Date(refreshToken.expiresIn),
        });

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken.token}`;

        setIsAuthenticated(true);
        message.success(
          "Kirish muvaffaqiyatli amalga oshirildi! Tegishli sahifaga yoʻnaltirilmoqda..."
        );
        navigate("/dashboard");

        getMe().catch(error =>
          console.error("Failed to fetch user data:", error)
        );
      } else {
        throw new Error("No token provided");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please try again.");
      setLoading(false);
    }
  };

  const logout = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
