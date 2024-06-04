import { React, useState, useEffect } from "react";
import { styled } from "styled-components";
import MapComponent from "../../components/map";
import axios from "axios";
import config from "../../others/apikey";
import "../../others/font/font.css";
import logo from "../../others/img/logo-icon.png";
import locationLogo from "../../others/img/LocationPinned.png";
import { useNavigate } from "react-router-dom";
import { Wrapper, Title, LogoImage, TitleDiv, MainContainer, Blank } from "../../styles/Styles";
import { Link } from "react-router-dom";
import Carousel from "../../components/carousel";

const Icon = styled.div`

`;

const LocationInfo = styled.div`
  font-size: 26px;
  margin-left: 10px;
  
`;

const TopContainer = styled.div`
  display: flex;
  width: 400px;
`;

const UnVisitButton = styled.button`
  width: 70px;
  padding: 10px 0;
  border-radius: 30px;
  border: 3px solid #A3CCAA;
  font-size: 18px;
  background-color: white;
  color: #A3CCAA;
`;


const SetCurrentButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  background: none;
  margin: 0;
  padding: 0;

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
  font-size: 18px;
  font-weight: bold;
`;

const Popup = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  width: 345px; 
  align-items: center;

  .loc {
    margin: 10px;
    display: flex;
    flex-direction: row;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Popup_UnVisitButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: 1px solid #A3CCAA;
  width: 250px;
  font-size: 18px;
  background-color: #FFFFFF;
  color: #A3CCAA;
  margin: 5px;

  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
`;

const Popup_VisitButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  width: 250px;
  font-size: 18px;
  background-color: #A3CCAA;
  color: #FFFFFF;
  margin: 30px 5px 5px 5px;

  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
`;

const MainMap = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentLocationPin, setCurrentLocationPin] = useState(null);

  //let centerAdd ='';

  const navigate = useNavigate();

  const [centerAdd, setcenterAdd] = useState("");



  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setPopupVisible(true);
  };

  const handleConfirmClick = () => {
    setPopupVisible(false);
    if (selectedLocation) {
      navigate(`/total-info/${selectedLocation.address}`);
    }
  };

  const handleCancelClick = () => {
    setPopupVisible(false);
    setSelectedLocation(null);
  };

  const updateLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLoading(false);
        fetchAddress(latitude, longitude);
        setCurrentLocationPin({ latitude, longitude });
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
      const response = await axios.get(url, { withCredentials: false });
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

  const moveend =  (add) => {
    setcenterAdd(add.split(' ').slice(1,4).join(' '));
    console.log(add);
  };
  
  const onvisit =  () => {
    if(centerAdd == userInfo().region1){
      navigate(`/feed`);  
    }else{
      navigate(`/visitor-feed/${centerAdd}`);  
    }
  };
  
  
  const userInfo = () => {
    const session = sessionStorage.getItem('user');
    const user = JSON.parse(session);
    return user.data;
  }

  const items = [
    'first',
    'second',
    'third'
  ];

  return (
    <>
      <Title>
        <Blank/><Blank/><Blank/><Blank/>
        <TitleDiv><LogoImage src={logo} alt="Logo" /><span>꼭꼭</span>
        <div><Link to="/upload-place" style={{ textDecoration: "none" }}><WriteBtn>명소<span style={{ padding: "0px 4px", width: "50px", borderRadius: "100%", backgroundColor: "#A3CCAA", color: "white", textAlign: "center"}}>+ </span></WriteBtn></Link></div>
        </TitleDiv>
      </Title>
     
      <MainContainer>
        <TopContainer>
        <div className="location">
          <Icon><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4443 15.3505C17.8885 13.9056 18.6998 11.9462 18.6998 9.90331C18.6998 7.86038 17.8885 5.90106 16.4443 4.45611C15.7294 3.74076 14.8806 3.17328 13.9463 2.7861C13.012 2.39893 12.0106 2.19965 10.9993 2.19965C9.98798 2.19965 8.98657 2.39893 8.05229 2.7861C7.11801 3.17328 6.26918 3.74076 5.55431 4.45611C4.11011 5.90106 3.29883 7.86038 3.29883 9.90331C3.29883 11.9462 4.11011 13.9056 5.55431 15.3505L7.22741 16.9994L9.47471 19.1829L9.62101 19.3127C10.4735 20.0035 11.722 19.9595 12.525 19.1829L15.2035 16.5759L16.4443 15.3505ZM10.9993 13.2C10.1241 13.2 9.28472 12.8523 8.66585 12.2335C8.04698 11.6146 7.69931 10.7752 7.69931 9.90001C7.69931 9.0248 8.04698 8.18543 8.66585 7.56656C9.28472 6.94769 10.1241 6.60001 10.9993 6.60001C11.8745 6.60001 12.7139 6.94769 13.3328 7.56656C13.9516 8.18543 14.2993 9.0248 14.2993 9.90001C14.2993 10.7752 13.9516 11.6146 13.3328 12.2335C12.7139 12.8523 11.8745 13.2 10.9993 13.2Z" fill="#A3CCAA" /></svg></Icon>
          {address && (<LocationInfo>{address}</LocationInfo>)}
        </div>
        <Carousel items ={items}/>
        </TopContainer>
        <div>
          {loading ? (<span style={{ alignItems: "center", height: "467px", margin: "auto" }}>Loading...</span>) : (
            <MapComponent 
              onLocationClick={handleLocationClick} 
              apiKey={config.MAP_API_KEY} 
              pins={getplace}
              currentLocation={currentLocationPin} 
              onMapMoveEnd = {moveend}
            />
          )}
        </div>
        <div>
          <div className="under">
            <div className="visit">
              <p>{centerAdd}</p>
            </div>
            <div className="buttonContainer">
              <div className="unSelected"><UnVisitButton onClick={onvisit}>방문</UnVisitButton> </div>
              <div className="locButton"><SetCurrentButton onClick={updateLocation}><img style={{ width: "50px", height: "50px" }} src={locationLogo}></img></SetCurrentButton></div>
            </div>
          </div>
        </div>
      </MainContainer>

      {popupVisible && (
        <>
          <PopupOverlay onClick={handleCancelClick} />
          <Popup>
          <div class="loc"><Icon><svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4443 15.3505C17.8885 13.9056 18.6998 11.9462 18.6998 9.90331C18.6998 7.86038 17.8885 5.90106 16.4443 4.45611C15.7294 3.74076 14.8806 3.17328 13.9463 2.7861C13.012 2.39893 12.0106 2.19965 10.9993 2.19965C9.98798 2.19965 8.98657 2.39893 8.05229 2.7861C7.11801 3.17328 6.26918 3.74076 5.55431 4.45611C4.11011 5.90106 3.29883 7.86038 3.29883 9.90331C3.29883 11.9462 4.11011 13.9056 5.55431 15.3505L7.22741 16.9994L9.47471 19.1829L9.62101 19.3127C10.4735 20.0035 11.722 19.9595 12.525 19.1829L15.2035 16.5759L16.4443 15.3505ZM10.9993 13.2C10.1241 13.2 9.28472 12.8523 8.66585 12.2335C8.04698 11.6146 7.69931 10.7752 7.69931 9.90001C7.69931 9.0248 8.04698 8.18543 8.66585 7.56656C9.28472 6.94769 10.1241 6.60001 10.9993 6.60001C11.8745 6.60001 12.7139 6.94769 13.3328 7.56656C13.9516 8.18543 14.2993 9.0248 14.2993 9.90001C14.2993 10.7752 13.9516 11.6146 13.3328 12.2335C12.7139 12.8523 11.8745 13.2 10.9993 13.2Z" fill="#77605B" /></svg></Icon>{selectedLocation.name}</div>
            <h3> 해당 장소에 방문할까요?</h3>
            <div>
              <div><Popup_VisitButton onClick={handleConfirmClick}>이동</Popup_VisitButton></div>
              <div><Popup_UnVisitButton onClick={handleCancelClick}>취소</Popup_UnVisitButton></div>
            </div>
          </Popup>
        </>
      )}
    </>
  );
}

export default MainMap;

