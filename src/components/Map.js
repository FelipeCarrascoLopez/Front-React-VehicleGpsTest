import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 0, // Coordenadas iniciales
  lng: 0,
};

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch("https://api-rails.site/api/v1/vehicles");
        const data = await response.json();
        console.log("Vehicles fetched:", data); // Verifica los datos aquí
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    }
    fetchVehicles();
  }, []);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
      {vehicles.map((vehicle) => {
        const lat = parseFloat(vehicle.latitude);
        const lng = parseFloat(vehicle.longitude);

        if (isNaN(lat) || isNaN(lng)) {
          console.error(`Invalid coordinates for vehicle ${vehicle.identifier}`);
          return null;
        }

        return (
          <Marker
            key={vehicle.identifier}
            position={{ lat, lng }}
            label={vehicle.identifier}
          />
        );
      })}
    </GoogleMap>
  );
}

export default Map;