import React, { useRef, useEffect } from 'react';
import config from '../others/apikey';

const MapComponent = ({ locations, onLocationClick, apiKey = config.MAP_API_KEY }) => {
  const mapRef = useRef();
  const markers = useRef([]);

  useEffect(() => {
    if (!apiKey) {
      console.error('API key is missing.');
      return;
    }

    // Google Maps API 스크립트를 동적으로 추가
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      const mapOptions = {
        center: { lat: 37.5665, lng: 126.978 }, // 초기 지도 중심 좌표 (서울)
        zoom: 12, // 초기 줌 레벨
      };

      // Google Maps 객체 생성 및 지도 연결
      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      // 기존 마커들 제거
      markers.current.forEach(marker => {
        marker.setMap(null);
      });

      // 새로운 마커들 추가
      markers.current = locations.map(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: map,
          title: location.name
        });

        // 마커 클릭 이벤트 리스너 추가
        marker.addListener('click', () => {
          onLocationClick(location.name);
        });

        return marker;
      });
    };

    return () => {
      // 컴포넌트 언마운트 시 Google Maps API 스크립트 제거
      document.head.removeChild(script);
    };
  }, [locations, apiKey, onLocationClick]);

  return <div ref={mapRef} style={{ height: '450px', width: '100%', borderRadius: "20px", border: "1px solid #D9D9D9"}} />;
};

export default MapComponent;
