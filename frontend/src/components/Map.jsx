// src/components/Map.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ locationName }) => {
  const [position, setPosition] = useState([20.9517, 85.0985]); // Default position
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`
        );
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.error('Location not found');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [locationName]);

  return (
    <div className='w-[100vw] cmd:h-[110vh] h-[185vh] flex items-center justify-center relative z-10 '>
      <MapContainer
        center={position}
        zoom={13}
        className='w-[100%] h-[100%]  shadow-[2px_4px_4px_rgba(0,0,0,0.4)] border-2'
        scrollWheelZoom={false}
        key={position.toString()} // Trigger re-render when position changes
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; CREATEFOLIO , Made By Happy Samal'
        />
        <Marker position={position}>
          <Popup >{locationName}</Popup>
        </Marker>
      </MapContainer>
      {loading && <p className='text-black'>Loading...</p>}
    </div>
  );
};

export default Map;
