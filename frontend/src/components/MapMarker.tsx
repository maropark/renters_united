import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import '../styles/MapMarker.css';

interface RentalProps {
  id: number;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  description: string;
  lat: number;
  lng: number;
}

interface MapMarkerProps {
  rental: RentalProps;
}

const MapMarker: React.FC<MapMarkerProps> = ({ rental }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Marker
      position={{ lat: rental.lat, lng: rental.lng }}
      onClick={toggleOpen}
      icon={{
        url: `data:image/svg+xml;utf8,
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="40" rx="20" fill="%23FFD5E6"/>
            <text x="40" y="25" font-family="Arial" font-size="16" fill="black" text-anchor="middle">$${rental.price}</text>
          </svg>`,
        scaledSize: new google.maps.Size(80, 40),
      }}
    >
      {isOpen && (
        <InfoWindow onCloseClick={toggleOpen}>
          <div className="rental-card">
            <img src={rental.imageUrl} alt={rental.title} className="rental-image" />
            <h3>{rental.title}</h3>
            <p>{rental.address}</p>
            <p>${rental.price}/month</p>
            <p>{rental.bedrooms} bed • {rental.bathrooms} bath • {rental.sqft} sqft</p>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default MapMarker;
