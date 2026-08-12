import { createContext, useContext, useMemo, useState } from 'react';

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, mode: 'login', redirectTo: '/read' });

  const value = useMemo(
    () => ({
      ...state,
      openLogin: (redirectTo = '/read') => setState({ isOpen: true, mode: 'login', redirectTo }),
      openRegister: (redirectTo = '/read') => setState({ isOpen: true, mode: 'register', redirectTo }),
      close: () => setState((s) => ({ ...s, isOpen: false })),
      switchMode: (mode) => setState((s) => ({ ...s, mode })),
    }),
    [state]
  );

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error('useAuthModal must be used within AuthModalProvider');
  return ctx;
}
