import React, { createContext, useEffect, useState } from 'react';
import history from '../utils/history'; //History necessariamente precisa ser vs 4.10.1
import { useCookies } from 'react-cookie';
import axios from '../utils/axiosConfig';

export const AuthContext = createContext();

export function AuthProvider({ children, ...rest }) {
  const [cookies] = useCookies(['access-token']);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const cookie = cookies['jwt_token'];
    if (!cookie || cookie === 'undefined') {
      document.cookie =
        'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setLoadingAuth(false);
    } else {
      axios
        .post('/api/auth', { token: cookie })
        .then(({ data }) => {
          if (data.status) {
            setUserId(data[0].id);
            setUserEmail(data[0].email);
            setUserName(data[0].name);
            setIsAuthenticated(true);
            setLoadingAuth(false);
          } else {
            handleLogout();
          }
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, [cookies]);

  async function handleLogout() {
    document.cookie =
      'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    await new Promise((resolve) => setTimeout(() => resolve(), 500));

    setIsAuthenticated(false);
    setLoadingAuth(false);

    history.push(`/login`);
  }

  return (
    <AuthContext.Provider
      value={{
        handleLogout,
        loadingAuth,
        setLoadingAuth,
        isAuthenticated,
        setIsAuthenticated,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
