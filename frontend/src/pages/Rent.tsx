import React from 'react';
import RentalCard from '../components/RentalCard';
import MapComponent from '../components/MapComponent';
import '../styles/Rent.css';

const Rent: React.FC = () => {
  const rentals = [
    { id: 1, images: ['url1', 'url2'], price: 1500, bedrooms: 2, bathrooms: 1, address: '123 Main St' },
    { id: 2, images: ['url3', 'url4'], price: 2000, bedrooms: 3, bathrooms: 2, address: '456 Elm St' },
  ];

  return (
    <div className="rent-page">
      <div className="map-section">
        <MapComponent />
      </div>
      <div className="rentals-section">
        {rentals.map(rental => (
          <RentalCard key={rental.id} rental={rental} />
        ))}
      </div>
    </div>
  );
};

export default Rent;