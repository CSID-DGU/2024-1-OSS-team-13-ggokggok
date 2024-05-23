import React, { useRef, useEffect } from 'react';
import config from '../others/apikey';

const MapComponent = ({ onLocationClick, apiKey = config.MAP_API_KEY, pins }) => {
  const mapRef = useRef();
  const markers = useRef([]);
  const isApiLoaded = useRef(false);

  useEffect(() => {
    if (!apiKey) {
      console.error('API key is missing.');
      return;
    }

    const loadMap = () => {
      const mapOptions = {
        center: { lat: 37.5665, lng: 126.978 }, // 초기 지도 중심 좌표 (서울)
        zoom: 12, // 초기 줌 레벨
        mapTypeControl: true, // 지도 타입 컨트롤 표시
        mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.DEFAULT,
          mapTypeIds: [
            window.google.maps.MapTypeId.ROADMAP,
            window.google.maps.MapTypeId.SATELLITE,
          ],
        },
       
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

        marker.addListener('click', () => {
          onLocationClick(location);
        });

        return marker;
      });
    };

    const existingScript = document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places"]`);

    if (existingScript) {
      existingScript.addEventListener('load', loadMap);
      if (window.google && window.google.maps) {
        loadMap();
      }
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        isApiLoaded.current = true;
        loadMap();
      };

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [apiKey, onLocationClick, pins]);

  return (
    <>
      <div ref={mapRef} style={{ height: '380px', width: '100%', borderRadius: "20px", border: "1px solid #D9D9D9" }} />
    </>
  );
};

export default MapComponent;
