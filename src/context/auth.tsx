import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';
import jwtDecode from 'jwt-decode';

const tokenKey = 'auth-token';

export function getAuthTokenFromStorage() {
  return localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey);
}

type Context = {
  user: TokenDecoded | null;
  logout: VoidFunction;
  login: (token: string, rememberMe?: boolean) => void;
};

const AuthContext = createContext<Context>({
  user: null,
  logout: () => {},
  login: () => {},
});
AuthContext.displayName = 'Auth Context';

export default function AuthProvider({ children }: FCWithChildren) {
  const navigate = useNavigate();
  const [localToken, setLocalToken] = useLocalStorage({
    key: tokenKey,
    defaultValue: localStorage.getItem(tokenKey),
  });

  const [sessionToken, setSessionToken] = useLocalStorage({
    key: tokenKey,
    defaultValue: sessionStorage.getItem(tokenKey),
  });

  const token = localToken || sessionToken;

  const user = useMemo(() => {
    try {
      if (token) {
        const tokenData = jwtDecode(token) as TokenDecoded;
        return tokenData;
      }
    } catch (error) {}
    return null;
  }, [token]);

  function setToken(token: string, mode: 'localStorage' | 'sessionStorage' | 'both' = 'both') {
    if (mode === 'both') {
      setLocalToken(token);
      setSessionToken(token);
    } else if (mode === 'localStorage') {
      setLocalToken(token);
    } else {
      setSessionToken(token);
    }
  }

  const login: Context['login'] = (token, keepme = true) => {
    setToken(token, keepme ? 'localStorage' : 'sessionStorage');
    navigate('/');
  };

  const logout: Context['logout'] = () => {
    setToken('');
    navigate('/');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children} </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
