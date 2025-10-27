import { useRef, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TheGoodStuff from "./pages/theGoodStuff/TheGoodStuff";

function App() {
  return (
    <>
      <TheGoodStuff />
      <div style={{ height: 300 }}></div>
    </>
  );
}

export default App;
