import React, { useState, createContext, useContext } from "react";


const customContext = createContext();

export const useCustom = () => {
  const context = useContext(customContext);
  return context;
};


export const CustomContainer = ({ children }) => {
  const [path, setPath] = useState("");

  return (
    <customContext.Provider value={{ path, setPath }}>
      {children}
    </customContext.Provider>
  );
};
