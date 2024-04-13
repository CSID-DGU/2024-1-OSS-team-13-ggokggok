import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import MapComponent from "../../components/map";
import { useEffect } from "react";




const Title = styled.h1`
  font-size: 40px;
  justify-content: center;
  display: flex;
  margin: 0px;
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
`;

export default function main_map() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");


  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const onSubmit = async (e) => {
    
  };

  const onChange = async (e) => {
    
  };

  const updateLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error.message);
        setLoading(false);

      }
    );
  };

  useEffect(() => {updateLocation();},[]);

  console.log(location);

  return (
    <>
      <Title>
        꼭꼭
      <WriteBtn> 글 쓰기 </WriteBtn>
      </Title>
      <SubTitle>
      <Icon>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.4443 15.3505C17.8885 13.9056 18.6998 11.9462 18.6998 9.90331C18.6998 7.86038 17.8885 5.90106 16.4443 4.45611C15.7294 3.74076 14.8806 3.17328 13.9463 2.7861C13.012 2.39893 12.0106 2.19965 10.9993 2.19965C9.98798 2.19965 8.98657 2.39893 8.05229 2.7861C7.11801 3.17328 6.26918 3.74076 5.55431 4.45611C4.11011 5.90106 3.29883 7.86038 3.29883 9.90331C3.29883 11.9462 4.11011 13.9056 5.55431 15.3505L7.22741 16.9994L9.47471 19.1829L9.62101 19.3127C10.4735 20.0035 11.722 19.9595 12.525 19.1829L15.2035 16.5759L16.4443 15.3505ZM10.9993 13.2C10.1241 13.2 9.28472 12.8523 8.66585 12.2335C8.04698 11.6146 7.69931 10.7752 7.69931 9.90001C7.69931 9.0248 8.04698 8.18543 8.66585 7.56656C9.28472 6.94769 10.1241 6.60001 10.9993 6.60001C11.8745 6.60001 12.7139 6.94769 13.3328 7.56656C13.9516 8.18543 14.2993 9.0248 14.2993 9.90001C14.2993 10.7752 13.9516 11.6146 13.3328 12.2335C12.7139 12.8523 11.8745 13.2 10.9993 13.2Z" fill="#A3CCAA"/>
        </svg>
      </Icon>
        현재 위치
      </SubTitle>
      {loading ? ( <h1>Loading...</h1>
      ) : (
        <MapComponent lon={location.longitude} lat={location.latitude} />
      )}
      <Btn>지역 등록하기</Btn>
      
    </>
  );
}
