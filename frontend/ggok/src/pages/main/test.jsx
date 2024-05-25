/*
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

export default Test; */

import { React, useState, useEffect } from "react";
import { styled } from "styled-components";
import MapComponent from "../../components/map";
import axios from "axios";
import config from "../../others/apikey";
import "../../others/font/font.css";
import logo from "../../others/img/logo-icon.png";
import leftlogo from "../../others/img/left-button.png";
import locationLogo from "../../others/img/LocationPinned.png";
import { useNavigate } from "react-router-dom";
import { Wrapper, Title, LogoImage, TitleDiv, MainContainer } from "../../styles/Styles";
import { Link } from "react-router-dom";

import Cookies from 'js-cookie';

const Icon = styled.div``;

const LocationInfo = styled.div`
  font-size: 24px;
  margin-left: 5px;
`;

const UnVisitButton = styled.button`
  padding: 15px;
  border-radius: 50px;
  border: 1px solid #A3CCAA;
  font-size: 18px;
  background-color: white;
  color: #A3CCAA;
`;

const VisitButton = styled.button`
  padding: 15px;
  border-radius: 50px;
  border: none;
  width: 180px;
  font-size: 18px;
  background-color: #A3CCAA;
  color: #FFFFFF;

  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const SetCurrentButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  background: none;

  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const WriteBtn = styled.div`
  border: none;
  background-color: white;
  color: #A3CCAA;
  font-size: 16px;
  font-weight: bold;
`;

const Test = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const navigate = useNavigate();

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    console.log(`Selected location: ${location}`);

    navigate(`/total-info/${location.address}`);


  };

  const updateLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLoading(false);
        fetchAddress(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error.message);
        setLoading(false);
      }
    );
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.MAP_API_KEY}`;
      const response = await axios.get(url, { withCredentials: false });  // 자격 증명 없이 요청
      console.log(response.data.results[0]);
      const addressComponents = response.data.results[0].address_components;

      let dongAddress = "";
      for (let component of addressComponents) {
        if (component.types.includes("political", "sublocality", "sublocality_level_2")) {
          dongAddress = component.long_name;
          break;
        }
      }

      setAddress(dongAddress || "동 정보 없음");
    } catch (error) {
      console.error('Error fetching address:', error.message);
      setAddress("주소를 가져올 수 없음");
    }
  };

  const [getplace, setplace] = useState([]);

    async function fetchPlace() {
        try {
          const response = await axios.get('https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/placesinfo/');
          setplace(response.data.data);
          console.log("get");
          console.log(getplace);

        } catch (error) {
          console.error('Error fetching data:', error);
        }   

    }
  

  useEffect(() => {
    fetchPlace();
  }, []);

  useEffect(() => {
    updateLocation();
  }, []);

  return (
    <Wrapper>
      <Title>
        <TitleDiv><LogoImage src={logo} alt="Logo" /><span>꼭꼭</span></TitleDiv>
        <div><Link to="/upload-place" style={{ textDecoration: "none" }}><WriteBtn>명소 <span style={{ padding: "0px 4px", width: "50px", borderRadius: "100%", backgroundColor: "#A3CCAA", color: "white" }}> + </span></WriteBtn></Link></div>
      </Title>

      <MainContainer>
        <div className="location">
          <Icon><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4443 15.3505C17.8885 13.9056 18.6998 11.9462 18.6998 9.90331C18.6998 7.86038 17.8885 5.90106 16.4443 4.45611C15.7294 3.74076 14.8806 3.17328 13.9463 2.7861C13.012 2.39893 12.0106 2.19965 10.9993 2.19965C9.98798 2.19965 8.98657 2.39893 8.05229 2.7861C7.11801 3.17328 6.26918 3.74076 5.55431 4.45611C4.11011 5.90106 3.29883 7.86038 3.29883 9.90331C3.29883 11.9462 4.11011 13.9056 5.55431 15.3505L7.22741 16.9994L9.47471 19.1829L9.62101 19.3127C10.4735 20.0035 11.722 19.9595 12.525 19.1829L15.2035 16.5759L16.4443 15.3505ZM10.9993 13.2C10.1241 13.2 9.28472 12.8523 8.66585 12.2335C8.04698 11.6146 7.69931 10.7752 7.69931 9.90001C7.69931 9.0248 8.04698 8.18543 8.66585 7.56656C9.28472 6.94769 10.1241 6.60001 10.9993 6.60001C11.8745 6.60001 12.7139 6.94769 13.3328 7.56656C13.9516 8.18543 14.2993 9.0248 14.2993 9.90001C14.2993 10.7752 13.9516 11.6146 13.3328 12.2335C12.7139 12.8523 11.8745 13.2 10.9993 13.2Z" fill="#A3CCAA" /></svg></Icon>
          {address && (<LocationInfo>{address}</LocationInfo>)}
        </div>

        <div>
          {loading ? (<span style={{ alignItems: "center", height: "385px", margin: "auto" }}>Loading...</span>) : (
            <MapComponent
              lon={location.longitude}
              lat={location.latitude}
              onLocationClick={handleLocationClick}
              pins={getplace}
            />
          )}
        </div>

        <div>
          {!selectedLocation && (
            <div className="under">
              <div className="visit">
                <p>어느 곳</p><h2>에 방문할까요?</h2>
              </div>
              <div className="buttonContainer">
                <div className="unSelected"><UnVisitButton>장소를 선택해주세요</UnVisitButton> </div>
                <div className="locButton"><SetCurrentButton><img style={{ width: "50px", height: "50px" }} src={locationLogo}></img></SetCurrentButton></div>
              </div>
            </div>
          )}
          {selectedLocation && (
            <div className="under">
              <div className="visit">
                <p>{selectedLocation}</p>
                <h2>에 방문할까요?</h2>
              </div>
              <div className="buttonContainer">
                <div className="Selected"><VisitButton>방문하기</VisitButton> </div>
                <div className="locButton"><SetCurrentButton><img style={{ width: "50px", height: "50px" }} src={locationLogo} /></SetCurrentButton></div>
              </div>
            </div>
          )}
        </div>
      </MainContainer>
    </Wrapper>
  );
}

export default Test;