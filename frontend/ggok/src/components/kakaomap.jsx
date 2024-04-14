import React, { useEffect, useRef } from 'react';
import config from '../others/kakaoapikey'; // API 키 import

const KakaoMap = ({ lon, lat }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMapScript = () => {
      if (!window.kakao || !window.kakao.maps) {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${config.kakaoApiKey}`;
        script.async = true;
        script.onload = initMap;
        document.body.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error('Kakao maps library not loaded.');
        return;
      }

      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(lat, lon),
        level: 3
      };

      try {
        const map = new window.kakao.maps.Map(container, options);

        // 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(lat, lon);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    loadMapScript();

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      const existingScript = document.querySelector('script[src*="maps/sdk.js"]');
      existingScript && document.body.removeChild(existingScript);
    };
  }, [lat, lon]);

  return (
    <div ref={mapRef} style={{ width: '500px', height: '400px' }}>
      {/* 지도가 여기에 렌더링됩니다 */}
    </div>
  );
};

export default KakaoMap;
