import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import MapComponent from "../../components/map";
import axios from "axios";
import config from "../../others/apikey";
import "../../others/font/font.css";
import logo from "../../others/img/logo-icon.png"

const Title = styled.h1`
  font-size: 40px;
  justify-content: center;
  display: flex;
  margin: 0px;
  padding-rigth: 20px;
  align-items: center;
`;

const WriteBtn = styled.button`
  position: absolute;
  right: 45px;
  border: none;
  background-color: white;
  color: #A3CCAA;
  font-size: 16px;
  font-weight: bold;
`;

const SubTitle = styled.h2`
  font-size: 24px;
  margin-left: 0px;
  text-align: left;
  display: flex;
`;

const Icon = styled.div`
  padding: 3px 10px 0px 0px;
`;

const LocationInfo = styled.div`
  font-size: 24px;
  margin-left: 0px;
  text-align: left;
  display: flex;
`;

const Btn = styled.button`
  margin-top: 20px;
  padding: 10px;
  border-radius: 50px;
  border: none;
  width: 95%;
  font-size: 16px;
  background-color : #A3CCAA;
  color: #FFFFFF;
  
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const LogoImage = styled.img`
  width: 45px; 
  height: auto; 
  margin-left: 0px;
`;


const SetRegion = (e)=> {
  e.preventDefault();
  navigate("/set-region")
}


const MainMap = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState("");

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
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.MAP_API_KEY}`
        const response = await axios.get(url);
        const addressComponents = response.data.results[0].address_components;
    
        // "동"을 포함한 부분 찾기
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

  useEffect(() => {
    updateLocation();
  }, []);

  console.log(location);

  return (
    <>
    
      <Title>
        <LogoImage src={logo} alt="Logo" ></LogoImage>
        꼭꼭
        <WriteBtn> 글 쓰기 </WriteBtn>
      </Title>
      <SubTitle>
        <Icon>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.4443 15.3505C17.8885 13.9056 18.6998 11.9462 18.6998 9.90331C18.6998 7.86038 17.8885 5.90106 16.4443 4.45611C15.7294 3.74076 14.8806 3.17328 13.9463 2.7861C13.012 2.39893 12.0106 2.19965 10.9993 2.19965C9.98798 2.19965 8.98657 2.39893 8.05229 2.7861C7.11801 3.17328 6.26918 3.74076 5.55431 4.45611C4.11011 5.90106 3.29883 7.86038 3.29883 9.90331C3.29883 11.9462 4.11011 13.9056 5.55431 15.3505L7.22741 16.9994L9.47471 19.1829L9.62101 19.3127C10.4735 20.0035 11.722 19.9595 12.525 19.1829L15.2035 16.5759L16.4443 15.3505ZM10.9993 13.2C10.1241 13.2 9.28472 12.8523 8.66585 12.2335C8.04698 11.6146 7.69931 10.7752 7.69931 9.90001C7.69931 9.0248 8.04698 8.18543 8.66585 7.56656C9.28472 6.94769 10.1241 6.60001 10.9993 6.60001C11.8745 6.60001 12.7139 6.94769 13.3328 7.56656C13.9516 8.18543 14.2993 9.0248 14.2993 9.90001C14.2993 10.7752 13.9516 11.6146 13.3328 12.2335C12.7139 12.8523 11.8745 13.2 10.9993 13.2Z" fill="#A3CCAA"/>
          </svg>
        </Icon>
      
        {address && (
          <LocationInfo>
            {address}
          </LocationInfo>
        )}
      </SubTitle>
      
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <MapComponent lon={location.longitude} lat={location.latitude} />
      )}
      <Btn onClick={SetRegion}>지역 등록하기</Btn>
    </>
  );
};

export default MainMap;
