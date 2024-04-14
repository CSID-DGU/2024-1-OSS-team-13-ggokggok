import React, { useRef, useEffect } from 'react';
import config from '../others/apikey';

const MapComponent = ({lon, lat , apiKey = config.MAP_API_KEY }) => {
  const mapRef = useRef();

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
      // Google Maps API 로드 완료 후 실행될 코드
      const mapOptions = {
        center: { lat: lat, lng: lon }, // 초기 지도 중심 좌표
        zoom: 17, // 초기 줌 레벨
      };

      // Google Maps 객체 생성 및 지도 연결
      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      // 지도 클릭 이벤트 리스너 추가
      map.addListener('click', (event) => {
        // 클릭한 위치의 위도와 경도
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();


        // 클릭한 위치의 위도와 경도 출력
        console.log(`Clicked Latitude: ${clickedLat}, Clicked Longitude: ${clickedLng}`);
      });
    };

    

    return () => {
      // 컴포넌트 언마운트 시 Google Maps API 스크립트 제거
      document.head.removeChild(script);
    };
  }, [apiKey]);

  return <div ref={mapRef} style={{ height: '500px', width: '100%', borderRadius: "20px", border: "1px solid #D9D9D9"}} />;
};

export default MapComponent;