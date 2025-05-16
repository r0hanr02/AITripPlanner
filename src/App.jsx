import React from "react";
import HEro from "./components/custom/HEro";

function App() {
  fetch(
    "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"
  )
    .then((response) => {
      if (response.ok) {
        console.log("✅ Google Maps API is working!");
      } else {
        console.log("❌ Google Maps API error:", response.status);
      }
    })
    .catch((error) => console.error("❌ Error fetching API:", error));

  return (
    <>
      {/* Hero */}

      <HEro />
    </>
  );
}

export default App;
