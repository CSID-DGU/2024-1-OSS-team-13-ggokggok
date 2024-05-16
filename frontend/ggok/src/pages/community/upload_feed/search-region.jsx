import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  padding: 55px 0px;
`;

const Title = styled.h1`
  font-size: 30px;
  color: #534340;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 323px;
  margin: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 20px;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  height: 40px;
  padding: 0 10px;
  margin-left: 10px;
  background-color: #A3CCAA;
  color: #FFFFFF;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;


const CurrentLocation = styled.button`
  display: flex;
  margin-right: 140px;
  font-size: 20px;
  height: 22px;
  align-items: center; 
  border: none;
  background-color: white;
`;

const Sub = styled.h5`
  color: #717171;
  padding: 5px;
`;


const SVGImage = (
  <svg width="22" height="22" viewBox="0 1.5 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.4443 15.3505C17.8885 13.9056 18.6998 11.9462 18.6998 9.90331C18.6998 7.86038 17.8885 5.90106 16.4443 4.45611C15.7294 3.74076 14.8806 3.17328 13.9463 2.7861C13.012 2.39893 12.0106 2.19965 10.9993 2.19965C9.98798 2.19965 8.98657 2.39893 8.05229 2.7861C7.11801 3.17328 6.26918 3.74076 5.55431 4.45611C4.11011 5.90106 3.29883 7.86038 3.29883 9.90331C3.29883 11.9462 4.11011 13.9056 5.55431 15.3505L7.22741 16.9994L9.47471 19.1829L9.62101 19.3127C10.4735 20.0035 11.722 19.9595 12.525 19.1829L15.2035 16.5759L16.4443 15.3505ZM10.9993 13.2C10.1241 13.2 9.28472 12.8523 8.66585 12.2335C8.04698 11.6146 7.69931 10.7752 7.69931 9.90001C7.69931 9.0248 8.04698 8.18543 8.66585 7.56656C9.28472 6.94769 10.1241 6.60001 10.9993 6.60001C11.8745 6.60001 12.7139 6.94769 13.3328 7.56656C13.9516 8.18543 14.2993 9.0248 14.2993 9.90001C14.2993 10.7752 13.9516 11.6146 13.3328 12.2335C12.7139 12.8523 11.8745 13.2 10.9993 13.2Z" fill="#A3CCAA"/>
  </svg>
);



export default function SearchRegion() {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // 여기서 검색을 실행하거나 다른 작업을 수행할 수 있습니다.
  };

  const handleSubmit = () => {
    // 검색 버튼 클릭 시 실행되는 작업을 여기에 구현하세요.
    // 예를 들어, 검색 결과 페이지로 이동하는 등의 동작을 수행할 수 있습니다.
    console.log("Search term:", searchTerm);
  };


  return (
    <Wrapper>
     <Title>내 지역 설정</Title>
     <SearchContainer>
        <SearchInput type="text" value={searchTerm}  placeholder="검색어를 입력하세요..." />
        <SearchButton onClick={handleSubmit}>검색</SearchButton>
      </SearchContainer>


      <CurrentLocation>
        {SVGImage} 
         <Sub>현재 위치로 검색하기</Sub>
      </CurrentLocation>
     
    </Wrapper>
  );

  }







