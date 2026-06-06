"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface AuthUser {
  nombre: string;
  email: string;
  rol: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: AuthUser = {
  nombre: "Alex Montenegro",
  email: "alex@hidrohuertos.co",
  rol: "Embajador Raíz",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("hidrhuertos-auth");
    if (stored === "authenticated") {
      setUser(MOCK_USER);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, _password: string): Promise<boolean> => {
      // Simular latencia de red
      await new Promise((r) => setTimeout(r, 800));

      // Aceptar cualquier email con @ y cualquier contraseña
      if (email.includes("@")) {
        localStorage.setItem("hidrhuertos-auth", "authenticated");
        setUser({ ...MOCK_USER, email });
        return true;
      }
      return false;
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("hidrhuertos-auth");
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
