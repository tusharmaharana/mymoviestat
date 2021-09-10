import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const AuthProvider = props => {
  const [userData, setUserData] = useState(undefined);
  const [authModalState, setAuthModalState] = useState(undefined);

  const fetchUser = useCallback(async () => {
    try {
      const user = await requestServer('current-user');
      setUserData(user);
    } catch (err) {
      setUserData(null);
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    setAuthModalState(null);
  }, [userData]);

  const signIn = async values => {
    try {
      const user = await requestServer('auth/signIn', { body: values });
      // window.location.reload();
      setUserData(user);
    } catch (err) {
      console.error('Nahi hua login.');
    }
  };

  const signUp = async values => {
    const user = await requestServer('auth/signUp', { body: values });
    setUserData(user);
  };

  const signOut = async () => {
    try {
      await requestServer('auth/signOut');
      console.log('logout hui gawa');
      setUserData(null);
    } catch (err) {
      console.log('AuthContext', err);
    }
  };

  const requestServer = async (endpoint, { body, ...customConfig } = {}) => {
    const config = {
      method: body ? 'POST' : 'GET',
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
      headers: {
        'content-type': body ? 'application/json' : undefined,
        ...customConfig.headers
      },
      ...customConfig
    };

    return fetch(`/api/${endpoint}`, config).then(async response => {
      console.log(response);
      if (response.status === 401) {
        setUserData(null);
        return null;
      }
      if (response.ok) return response.json();
      else {
        // const errorMessage = await response.json();
        return Promise.reject('');
      }
    });
  };

  // const requestServer = async (endpoint, { body, ...customConfig } = {}) => {
  //   const config = {
  //     method: body ? 'POST' : 'GET',
  //     body: body ? JSON.stringify(body) : undefined,
  //     credentials: 'include',
  //     headers: {
  //       'content-type': body ? 'application/json' : undefined,
  //       ...customConfig.headers
  //     },
  //     ...customConfig
  //   };

  //   return fetch(`${process.env.REACT_APP_SERVER}/api/${endpoint}`, config).then(async response => {
  //     if (response.status === 401) {
  //       setUserData(null);
  //       return null;
  //     }
  //     if (response.ok) return response.json();
  //     else {
  //       // const errorMessage = await response.json();
  //       return Promise.reject('');
  //     }
  //   });
  // };

  const value = {
    state: { userData, authModalState },
    actions: { signIn, signOut, signUp, requestServer, setAuthModalState }
  };

  return <AuthContext.Provider value={value} {...props} />;
};
