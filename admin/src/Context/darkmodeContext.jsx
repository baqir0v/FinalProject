import React, { createContext, useState, useEffect } from 'react';

export const DarkmodeContext = createContext();

const DarkmodeProvider = ({ children }) => {
  const initialDarkMode = localStorage.getItem('darkmode') === 'true';

  const [darkmode, setDarkmode] = useState(initialDarkMode);

  useEffect(() => {
    localStorage.setItem('darkmode', darkmode);
  }, [darkmode]);

  const handleDarkmode = () => {
    setDarkmode(!darkmode);
  };

  const data = { darkmode, handleDarkmode };

  return (
    <DarkmodeContext.Provider value={data}>
      {children}
    </DarkmodeContext.Provider>
  );
};

export default DarkmodeProvider;
