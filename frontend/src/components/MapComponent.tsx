import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, StandaloneSearchBox, Polygon } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

const libraries: ("places" | "geometry" | "drawing")[] = ["places", "geometry", "drawing"];

const MapComponent: React.FC = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const [boundary, setBoundary] = useState<google.maps.LatLngLiteral[]>([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onSearchBoxLoad = useCallback((ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  }, []);

  const fetchBoundary = async (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      try {
        // Replace with your preferred boundary data API
        const response = await axios.get(`https://api.example.com/boundaries`, {
          params: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            type: "city", // or "zipcode" or "state"
          },
        });
        
        if (response.data && response.data.coordinates) {
          setBoundary(response.data.coordinates);
        }
      } catch (error) {
        console.error("Error fetching boundary data:", error);
      }
    }
  };

  const onPlacesChanged = useCallback(() => {
    if (searchBox && map) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry && place.geometry.location) {
          map.setCenter(place.geometry.location);
          map.setZoom(12);
          fetchBoundary(place);
        }
      }
    }
  }, [searchBox, map]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onMapLoad}
      >
        {boundary.length > 0 && (
          <Polygon
            paths={boundary}
            options={{
              fillColor: "#00FF00",
              fillOpacity: 0.2,
              strokeColor: "#00FF00",
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        )}
        <div style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          backgroundColor: "white",
          padding: "5px",
          borderRadius: "5px",
        }}>
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Search for city, zipcode, or state"
              style={{
                boxSizing: "border-box",
                border: "1px solid transparent",
                width: "240px",
                height: "32px",
                padding: "0 12px",
                borderRadius: "3px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                fontSize: "14px",
                outline: "none",
                textOverflow: "ellipses",
              }}
            />
          </StandaloneSearchBox>
        </div>
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
