"use strict";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeContext } from "./context/ThemeProvider";

const root = document.getElementById('root');

// Clear console on Vite refresh
if (import.meta.hot) {
  import.meta.hot.on(
    "vite:beforeUpdate",
    () => console.clear()
  );
}

if (localStorage.getItem("theme")) {
  document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeContext value={localStorage.getItem("theme")}>
      <App />
    </ThemeContext>
  </React.StrictMode>
);
