'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import type { UserData } from '@/src/types/index';

type UserContextType = {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: UserData | null;
}) {
  const [user, setUser] = useState<UserData | null>(initialData);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de UserProvider');
  return context;
}
