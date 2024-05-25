import React, { useRef, useEffect, useState } from 'react';
import config from '../others/apikey';

const MapComponent = ({ onLocationClick, apiKey = config.MAP_API_KEY, pins, currentLocation }) => {
  const mapRef = useRef();
  const markers = useRef([]);
  const [map, setMap] = useState(null);

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

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      markers.current.forEach(marker => {
        marker.setMap(null);
      });

      markers.current = pins.map(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: parseFloat(location.lat), lng: parseFloat(location.long) },
          map: newMap,
          title: location.title,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new window.google.maps.Size(32, 32),
          },
        });

        marker.addListener('click', () => {
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div>${location.title}</div>`,
          });
          infoWindow.open(newMap, marker);
          onLocationClick(location);
        });

        return marker;
      });

      if (currentLocation) {
        const currentLocationMarker = new window.google.maps.Marker({
          position: { lat: currentLocation.latitude, lng: currentLocation.longitude },
          map: newMap,
          title: '현재 위치',
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: new window.google.maps.Size(50, 50),
          },
        });
        currentLocationMarker.addListener('click', () => {
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div>현재 위치</div>`,
          });
          infoWindow.open(newMap, currentLocationMarker);
        });
        markers.current.push(currentLocationMarker);
        newMap.setCenter({ lat: currentLocation.latitude, lng: currentLocation.longitude });
      }
    };
  };

  useEffect(() => {
    loadMap();
    return () => {
      const script = document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js?key=${apiKey}"]`);
      if (script) document.head.removeChild(script);
    };
  }, [apiKey, pins, onLocationClick]);

  useEffect(() => {
    if (map && currentLocation) {
      map.setCenter({ lat: currentLocation.latitude, lng: currentLocation.longitude });
      markers.current.forEach(marker => {
        if (marker.getTitle() === '현재 위치') {
          marker.setPosition({ lat: currentLocation.latitude, lng: currentLocation.longitude });
        }
      });
    }
  }, [currentLocation, map]);

  return <div ref={mapRef} style={{ height: '550px', width: '100%', borderRadius: '20px', border: '1px solid #D9D9D9' }} />;
};

export default MapComponent;
