import React from 'react';

import { useStorageState } from '../hooks/useStorageState';

type AuthContextType = {
  signIn: (token: string | null) => void;
  signOut: () => void;
  session: string | null;
  isLoading: boolean;
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
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: token => {
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        isLoading,
        session,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
