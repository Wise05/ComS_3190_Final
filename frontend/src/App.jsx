import { useState } from "react";
import "./App.css";
import Artist from "./components/Artisit";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Artist />
    </>
  );
}

export default App;
