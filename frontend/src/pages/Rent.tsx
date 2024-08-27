import React, { useState } from 'react';
import RentalCard from '../components/RentalCard';
import '../index.css';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Rent: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Mock data for rental listings
  const rentals = [
    { id: 1, images: ['url1', 'url2'], price: 1500, bedrooms: 2, bathrooms: 1, address: '123 Main St' },
    { id: 2, images: ['url3', 'url4'], price: 2000, bedrooms: 3, bathrooms: 2, address: '456 Elm St' },
    // Add more rental objects as needed
  ];

  return (
    <div className={`rent-container ${isFullScreen ? 'fullscreen' : ''}`}>
      <div className="map-container">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {/* Add markers here */}
          </GoogleMap>
        </LoadScript>
        <button onClick={() => setIsFullScreen(!isFullScreen)}>
          {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
      <div className="rentals-list">
        {rentals.map(rental => (
          <RentalCard key={rental.id} rental={rental} />
        ))}
      </div>
    </div>
  );
};

export default Rent;