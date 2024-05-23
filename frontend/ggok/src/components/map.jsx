import React, { useRef, useEffect, useState } from 'react';
import config from '../others/apikey';

const MapComponent = ({ onLocationClick, apiKey = config.MAP_API_KEY, pins }) => {
  const mapRef = useRef();
  const markers = useRef([]);

  const loadMap = () => {
    if (!apiKey) {
      console.error('API key is missing.');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      const mapOptions = {
        center: { lat: 37.5665, lng: 126.978 },
        zoom: 12,
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      markers.current.forEach(marker => {
        marker.setMap(null);
      });

      markers.current = pins.map(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: parseFloat(location.lat), lng: parseFloat(location.long) },
          map: map,
          title: location.title
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div>${location.title}</div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          onLocationClick(location);
        });

        return marker;
      });
    };
  };

  useEffect(() => {
    loadMap();
    return () => {
      const script = document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js?key=${apiKey}"]`);
      if (script) document.head.removeChild(script);
    };
  }, [apiKey, pins, onLocationClick]);

  return <div ref={mapRef} style={{ height: '380px', width: '100%', borderRadius: '20px', border: '1px solid #D9D9D9' }} />;
};

export default MapComponent;
