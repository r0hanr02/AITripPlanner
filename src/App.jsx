import { useState } from "react";
import HEro from "./components/custom/HEro";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import ViewTrip from "./pages/ViewTrip";
import MyTrips from "./pages/MyTrips";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/create-trip" element={<CreateTrip/>} />
      <Route path="/view-trip/:tripId" element={<ViewTrip/>} />
      <Route path="/mytrips" element={<MyTrips/>} />
     
     </Routes>
    </div>
  );
}

export default App;
