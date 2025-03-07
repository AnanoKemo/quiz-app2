import "./App.css";
import circle from "./assets/circle.png";
import one from "./assets/1.png";
import two from "./assets/2.png";
import three from "./assets/3.png";
import four from "./assets/4.png";
import circle2 from "./assets/circle2.png";
import circle3 from "./assets/circle3.png";
import circle4 from "./assets/circle4.png";
import { useState, useEffect } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="background">
      <div className="image-wrapper">
        <img src={darkMode ? circle4 : circle} alt="Circle" />
      </div>
      <div className="overlay">
        <p>
          <span className="normal">Welcome to the </span>
          <span className="bold">frontend quiz!</span>
          <br />
          <span className="lighter">Pick a subject to get started</span>
        </p>
      </div>
      <div className="container">
        <div className="box">
          <img src={one} alt="1" className="box-img" />
          HTML
        </div>
        <div className="box">
          <img src={two} alt="2" className="box-img" />
          CSS
        </div>
        <div className="box">
          <img src={three} alt="3" className="box-img" />
          JavaScript
        </div>
        <div className="box">
          <img src={four} alt="4" className="box-img" />
          Accessibility
        </div>
      </div>

      <div className="mode-toggle" onClick={toggleDarkMode}>
        <div className={`circle ${darkMode ? "move" : ""}`}></div>
      </div>
      <img src={darkMode ? circle3 : circle2} alt="Circle2" className="circle2" />
    </div>
  );
}

export default App;
