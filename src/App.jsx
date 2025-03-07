import { useState } from "react";
import HEro from "./components/custom/HEro";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <HEro />
    </div>
  );
}

export default App;
