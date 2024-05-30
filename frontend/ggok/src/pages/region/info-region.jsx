import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 393px;
  padding: 55px 0px;
`;

const Title = styled.h1`
  font-size: 30px;
  color: #534340;

`;

const Map = styled.div`
  height: 245px;
  width: 303px;
  background-color: #F6F6F6;
  border-radius: 10px;
`;

const RegionButton = styled.button`
  height: 46px;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  margin: 20px;
  width: 315px;
  font-size: 17px;
  background-color : #A3CCAA;
  color: #FFFFFF;
`;


const InfoContainer = styled.div`
  margin-top: 10px;
  height: 487px;
  width: 392px;
  background-color : #ECF5EE;
  border-radius: 50px 50px 0px 0px;
  
`;

const RegionName = styled.h3` 
  font-size: 30px;
  margin: 30px 0px 20px 0px;
  color: #534340;
`;

const Line = styled.hr`
  width: 180px;
  border: 3px solid #534340;
  border-radius: 50px;
`;


const ButtonContainer = styled.div`
  width: 313px;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 35px;
  gap: 30px;
  padding: 15px;
`;


const Location = styled.div`
  border: none;
  background-color: white;
  padding: 14px 0px;
  border-radius: 50px;
  font-size: 16px;
  width: 313px;
`;


const OptionContainer = styled.div` 
  width: 313px;
  display: flex;
  justify-content: space-between; 
`;

const Option = styled.button`
  flex-grow: 1;
  margin: 0 5px;
  border: none;
  background-color: white;
  padding: 14px;
  border-radius: 50px;
  font-size: 16px;
  
`;

const Button = styled.button`
  border: none;
  background-color: white;
  padding: 14px 0px;
  width: 313px;
  border-radius: 50px;
  font-size: 16px;
`;



export default function SetRegion() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");


  const search_region = (e)=> {
    e.preventDefault();
    navigate("/search-region")
  }

  const main = (e)=> {
    e.preventDefault();
    navigate("/")
  }


  return (
    <Wrapper>
    <Title>내 지역 설정</Title>

    <RegionButton>
      <button onClick={() => handleOptionClick("Option 1")}>Option 1</button>
      <button onClick={() => handleOptionClick("Option 2")}>Option 2</button>
    </RegionButton>
    
    <InfoContainer>
      <RegionName> 내 지역 정보 </RegionName>
      <Line/>

      <ButtonContainer>
        <Location>서울특별시 중구 필동로1길 30 동국대학교</Location>
        <OptionContainer>
          <Option>거주지</Option>
          <Option>직장 및 학교</Option>
          <Option>기타</Option>
        </OptionContainer>
        <Button> 수정하기 </Button>
        <Button> 삭제하기 </Button>
      </ButtonContainer>
     
    </InfoContainer>


  </Wrapper>
  );
}