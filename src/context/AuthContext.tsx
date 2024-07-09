import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axiosInstance from "../services/api/axiosInstance";
import Cookies from "js-cookie";

export type User = {
  role: string;
  allowPages: string[];
  permissions: string[];
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const initialUser: User | null = null;

export const AuthContext = createContext<AuthContextType>({
  user: initialUser,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getMe = async () => {
    try {
      const response = await axiosInstance.get<User>("/getMe");
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getMe().catch(error =>
        console.error("Failed to fetch user data:", error)
      );
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post("/login", {
        username,
        password,
      });
      const { token } = response.data;

      if (token) {
        Cookies.set("token", token, { expires: 7 });
      } else {
        throw new Error("No token provided");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
