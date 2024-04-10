import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import MapComponent from "../../components/map";
import { useEffect } from "react";
import Get from "../../components/get_test";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
  
`;

const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  text-align: center;

`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 420px;
  font-size: 16px;
  background-color: #E8E8E8;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;

const Btn = styled.button`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    margin: 10px;
    width: 100%;
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
    
    <Wrapper>
      <Title>꼭꼭</Title>
      <h2>등록지역이름</h2>
      {loading ? <h1>Loading...</h1> :
      <MapComponent lon = {location.longitude} lat = {location.latitude}/>
      }
      <Btn>지역 등록하기</Btn>
      <Get></Get>
    </Wrapper>
  );
}