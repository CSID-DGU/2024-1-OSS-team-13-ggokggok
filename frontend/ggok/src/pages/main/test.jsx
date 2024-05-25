import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import config from '../../others/apikey';

const Test = () => {
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Google Maps API 초기화
    const initMap = () => {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.5665, lng: 126.9780 }, // 초기 중심 좌표
        zoom: 8, // 초기 줌 레벨
      });

      const geocoderInstance = new window.google.maps.Geocoder();
      setMap(mapInstance);
      setGeocoder(geocoderInstance);

      // 지도 이동 이벤트 리스너 등록
      mapInstance.addListener('idle', () => {
        if (geocoderInstance) {
          const center = mapInstance.getCenter();
          geocoderInstance.geocode({ location: center }, (results, status) => {
            if (status === 'OK' && results[0]) {
              setAddress(results[0].formatted_address);
            } else {
              setAddress('주소를 찾을 수 없습니다.');
            }
          });
        }
      });
    };

    // Google Maps API 스크립트 동적으로 로드
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.MAP_API_KEY}/&libraries=places`;

      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <h1>{address}</h1>
    </div>
  );
};

export default Test;