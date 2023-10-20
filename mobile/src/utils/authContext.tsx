import React from 'react';

import { useStorageState } from '../hooks/useStorageState';

type AuthContextType = {
  signIn: (username: string, token: string | null) => void;
  signOut: () => void;
  isSessionLoading: boolean;
  session: string | null;
  username: string | null;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production' && !value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value as AuthContextType;
}

export function SessionProvider(props: { children?: React.ReactNode }) {
  const [[isSessionLoading, session], setSession] = useStorageState('session');
  const [[isLoadingUsername, username], setUsername] = useStorageState('username');

  return (
    <AuthContext.Provider
      value={{
        signIn: (username, token) => {
          setUsername(username);
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        isSessionLoading,
        session,
        username,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
