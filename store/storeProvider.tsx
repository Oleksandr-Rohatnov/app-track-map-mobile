import React, { createContext, useContext } from 'react';
import store from '../store';

const StoreContext = createContext(store);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
