import { useState, useEffect, useContext, createContext } from 'react'
import { getSessionUser, getAccessToken, removeUser, setSessionToken, setSessionUser } from '../helpers/auth';
import { signup as authSignup, login as authLogin } from '../services/auth';

export type User = {
  id: string;
  username: string;
  email: string;
  favs: number[];
}


export interface IAuth {
    user: User | null,
    token: string,
    signup: (username: string, email: string, password: string) => any,
    login: (email: string, password: string) => void,
    logout: () => void,
}

const AuthContext = createContext<IAuth>({
    user: null,
    token: '',
    signup: () => {},
    login: () => {},
    logout: () => {},
});


export function ProvideAuth({ children }: {children: any}) {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

const storageUser = getSessionUser() ? getSessionUser() : null;
const storageToken = getAccessToken() ? getAccessToken() : null;

function useProvideAuth() : IAuth {
  const [user, setUser] = useState(storageUser);
  const [token, setToken] = useState(storageToken);

  const signup = async (username: string, email: string, password: string) => {
    const { data, status } = await authSignup(username, email, password);
    if (status !== 200) return data;
    setSessionToken(data.token);
    setSessionUser(data);
    setUser(data);
    setToken(data.token);
  };

  const login = async (email: string, password: string) => {
    const { data } = await authLogin(email, password) 
    setUser(data.user);

    setToken(data.token);
    setSessionToken(data.token);
    setSessionUser(data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeUser();
  };

  useEffect(() => {
    //check authentication
  }, [])
  return {
    user,
    token,
    signup,
    login,
    logout,
  }
}