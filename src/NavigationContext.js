import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const navigate = useNavigate();
  return (
    <NavigationContext.Provider value={navigate}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
