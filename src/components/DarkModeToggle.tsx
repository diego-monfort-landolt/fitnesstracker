import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggle = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <button onClick={toggle} style={{ fontSize: "1.5rem", background: "none", border: "none" }}>
      {isDark ? <FaSun  title="Heller Modus" /> : <FaMoon title="Dunkler Modus" color="#000" />}
    </button>
  );
};
