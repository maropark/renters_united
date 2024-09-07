import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Slider from 'react-slick';
import '../styles/RentalCard.css';

interface RentalProps {
  rental: {
    images: string[];
    price: number;
    bedrooms: number;
    bathrooms: number;
    address: string;
  };
}

const RentalCard: React.FC<RentalProps> = ({ rental }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Card className="rental-card">
      <Slider {...settings}>
        {rental.images.map((image, index) => (
          <div key={index}>
            <div className="rental-image" style={{backgroundImage: `url(${image})`}} />
          </div>
        ))}
      </Slider>
      <IconButton 
        className="favorite-button" 
        onClick={() => setIsFavorite(!isFavorite)}
      >
        {isFavorite ? <Favorite color="secondary" /> : <FavoriteBorder />}
      </IconButton>
      <CardContent>
        <Typography variant="h6">${rental.price}/month</Typography>
        <Typography variant="body2">
          {rental.bedrooms} bd | {rental.bathrooms} ba
        </Typography>
        <Typography variant="body2">{rental.address}</Typography>
      </CardContent>
    </Card>
  );
};

export default RentalCard;