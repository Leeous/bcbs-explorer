import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';


export const ThemeContext = createContext(); // Create the context

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "blue"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}> {/* ✅ Pass 'value' prop */}
      {children}
    </ThemeContext.Provider>
  );
};


ThemeProvider.propTypes = { 
    children: PropTypes.element
}