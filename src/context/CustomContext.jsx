import React, { useState, createContext, useContext } from "react";


const customContext = createContext();

export const useCustom = () => {
  const context = useContext(customContext);
  return context;
};

const colors = ["#E60516"];

export const CustomContainer = ({ children }) => {
  const [path, setPath] = useState("");

  return (
    <customContext.Provider value={{ path, setPath }}>
      {children}
    </customContext.Provider>
  );
};
