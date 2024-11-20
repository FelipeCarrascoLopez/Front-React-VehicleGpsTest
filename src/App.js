import React from "react";
import Map from "./components/Map";

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center">Vehicle Map</h1>
      <p className="text-center">
        Muestra la última posición registrada de los vehículos.
      </p>
      <Map />
    </div>
  );
}

export default App;
