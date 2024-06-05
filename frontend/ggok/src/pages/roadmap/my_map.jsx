import {React, useState, useEffect } from "react";
import { styled } from "styled-components";
import MapComponent from "../../components/map";
import axios from "axios";
import config from "../../others/apikey";
import "../../others/font/font.css";
import logo from "../../others/img/logo-icon.png"
import leftlogo from "../../others/img/left-button.png"
import { useNavigate } from "react-router-dom";
import { Wrapper, Title, LogoImage, TitleDiv, Blank, MainContainer } from "../../styles/Styles";
import { Link } from "react-router-dom";

const Icon = styled.div``;

const TextContainer = styled.div`
  margin: 12px;
  line-height: 35px;
  display: flex;
  margin-left: 10px;
  div {
    font-size: 28px;
  }
`;

const SubText = styled.div`
  color: gray;
  font-size: 10px;
  margin-bottom: 15px;
`;

const Line = styled.hr`
  width: 95%;
  border: 3px solid #77605B;
  border-radius: 50px;
  margin-bottom: 20px;
`;

const MainMap = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null); // 추가: 선택된 지역을 저장하는 state

  const navigate = useNavigate();


  const handleLocationClick = (location) => {
    setSelectedLocation(location); // 선택된 위치 업데이트
    console.log(`Selected location: ${location}`);
    navigate(`/place-info/${location.id}`);
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
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.MAP_API_KEY}`
      const response = await axios.get(url);
      console.log(response.data.results[0]);
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

  const [getplace, setplace] = useState([]);

    async function fetchPlace() {
        try {
          const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/?place=${userId()}`);
          setplace(response.data.data);
          console.log("get");
          console.log(getplace);

        } catch (error) {
          console.error('Error fetching data:', error);
        }   
    }

    useEffect(() =>{fetchPlace();}, []);

  useEffect(() => {
    updateLocation();
  }, []);


  const SetRegion = (e) => {
    e.preventDefault();
    navigate("/set-region");
  };

  const UploadForm = (e) => {
    e.preventDefault();
    navigate("/upload");
  };

  function userId() {
    const sessionData = sessionStorage.getItem('user');
    if (sessionData) {
      try {
        const userData = JSON.parse(sessionData);
        return parseInt(userData.data.id);
      } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
      }
    } else {
      console.error('Session data not found.');
      return null;
    }
  }

  return (
    <Wrapper>
      <Title>
        <Blank/><Blank/><Blank/><Blank/>
          <TitleDiv><LogoImage src={logo} alt="Logo" /><span>마이맵</span></TitleDiv>
        <Blank></Blank>
      </Title>

      <MainContainer>
        <TextContainer>
          <Icon><svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4443 15.3505C17.8885 13.9056 18.6998 11.9462 18.6998 9.90331C18.6998 7.86038 17.8885 5.90106 16.4443 4.45611C15.7294 3.74076 14.8806 3.17328 13.9463 2.7861C13.012 2.39893 12.0106 2.19965 10.9993 2.19965C9.98798 2.19965 8.98657 2.39893 8.05229 2.7861C7.11801 3.17328 6.26918 3.74076 5.55431 4.45611C4.11011 5.90106 3.29883 7.86038 3.29883 9.90331C3.29883 11.9462 4.11011 13.9056 5.55431 15.3505L7.22741 16.9994L9.47471 19.1829L9.62101 19.3127C10.4735 20.0035 11.722 19.9595 12.525 19.1829L15.2035 16.5759L16.4443 15.3505ZM10.9993 13.2C10.1241 13.2 9.28472 12.8523 8.66585 12.2335C8.04698 11.6146 7.69931 10.7752 7.69931 9.90001C7.69931 9.0248 8.04698 8.18543 8.66585 7.56656C9.28472 6.94769 10.1241 6.60001 10.9993 6.60001C11.8745 6.60001 12.7139 6.94769 13.3328 7.56656C13.9516 8.18543 14.2993 9.0248 14.2993 9.90001C14.2993 10.7752 13.9516 11.6146 13.3328 12.2335C12.7139 12.8523 11.8745 13.2 10.9993 13.2Z" fill="#A3CCAA" /></svg></Icon> <div> &nbsp; 내가 작성한 명소들</div>
        </TextContainer>
        <SubText>나만의 명소 게시물을 확인해보세요!</SubText>

        <div>
          <MapComponent
            lon={location.longitude}
            lat={location.latitude}
            onLocationClick={handleLocationClick}
            pins={getplace}
            style={{ height: '800px' }}
          />
        </div>
      </MainContainer>
    </Wrapper>
  );
};

export default MainMap;
