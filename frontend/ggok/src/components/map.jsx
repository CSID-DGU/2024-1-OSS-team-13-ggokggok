import React, { useRef, useEffect, useState } from 'react';
import config from '../others/apikey';

const MapComponent = ({ onLocationClick, onMapMoveEnd, apiKey = config.MAP_API_KEY, pins, currentLocation }) => {
  const mapRef = useRef();
  const markers = useRef([]);
  const [map, setMap] = useState(null);

  const [address, setAddress] = useState('');
  const [geocoder, setGeocoder] = useState(null);


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
        mapTypeControl: true, // 지도 타입 컨트롤 표시
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.DEFAULT,
        mapTypeIds: [
          window.google.maps.MapTypeId.ROADMAP,
          window.google.maps.MapTypeId.SATELLITE,
        ],
      },


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
            scaledSize: new window.google.maps.Size(40, 38),
          },
        });

        marker.addListener('click', () => {
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div>${location.name}</div>`,
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
            scaledSize: new window.google.maps.Size(30, 28),
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

      // 이동이 멈출 때마다 onMapMoveEnd 함수 실행
      const geocoderInstance = new window.google.maps.Geocoder();
      setGeocoder(geocoderInstance);

      newMap.addListener('idle', () => {
        if (geocoderInstance) {
          const center = newMap.getCenter();
          geocoderInstance.geocode({ location: center }, (results, status) => {
            if (status === 'OK' && results[0]) {
              //setAddress(results[0].formatted_address);
              onMapMoveEnd(results[0].formatted_address);
            } else {
              //setAddress('주소를 찾을 수 없습니다.');
            }
          });
        }
      });
    };
  };

  useEffect(() => {
    loadMap();
    return () => {
      const script = document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js?key=${apiKey}"]`);
      if (script) document.head.removeChild(script);
    };
  }, [apiKey, pins]); 

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

  return <div ref={mapRef} style={{ height: '380px', width: '100%', borderRadius: '20px', border: '1px solid #D9D9D9' }} />;
};

export default MapComponent;
