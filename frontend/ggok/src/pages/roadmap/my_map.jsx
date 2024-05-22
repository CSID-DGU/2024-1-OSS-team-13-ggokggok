import {React, useState, useEffect } from "react";
import { styled } from "styled-components";
import MapComponent from "../../components/map";
import axios from "axios";
import config from "../../others/apikey";
import "../../others/font/font.css";
import logo from "../../others/img/logo-icon.png"
import leftlogo from "../../others/img/left-button.png"
import locationLogo from "../../others/img/LocationPinned.png"
import { useNavigate } from "react-router-dom";
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, BackButton, MainContainer } from "../../styles/Styles";
import { Link } from "react-router-dom";

const Icon = styled.div`

`;

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
          const response = await axios.get('https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/post/');
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

  return (
    <Wrapper>

      <Title>
        <TitleDiv><LogoImage src={logo} alt="Logo" /><span>꼭꼭</span></TitleDiv>
      </Title>


      <MainContainer>

        <div>
          {loading ? ( <span> Loading...</span> ) : (
            <MapComponent
              lon={location.longitude}
              lat={location.latitude}
              onLocationClick={handleLocationClick} // 추가: 위치 클릭 핸들러 전달
              pins={getplace}
            />
           )}
        </div>

      </MainContainer>

    </Wrapper>
  );
};

export default MainMap;
