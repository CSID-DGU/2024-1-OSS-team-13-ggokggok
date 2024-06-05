import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { Wrapper, Title, TitleDiv, ExtraButton, MainContainer, Blank} from "../../../styles/Styles";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 370px;
  margin: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 50px;
  padding: 0 20px;
  border: 1px solid #ccc;
  border-radius: 50px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  height: 50px;
  width: 50px;
  padding: 0 10px;
  margin-left: 10px;
  background-color: #A3CCAA;
  color: #FFFFFF;
  border: none;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    background-color: #89b492;
  }
`;

const SVGImage = (
  <svg width="35" height="35" viewBox="0 1.5 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '3px', fill: '#A3CCAA', flexDirection: 'row' }}>
    <path d="M16.4443 15.3505C17.8885 13.9056 18.6998 11.9462 18.6998 9.90331C18.6998 7.86038 17.8885 5.90106 16.4443 4.45611C15.7294 3.74076 14.8806 3.17328 13.9463 2.7861C13.012 2.39893 12.0106 2.19965 10.9993 2.19965C9.98798 2.19965 8.98657 2.39893 8.05229 2.7861C7.11801 3.17328 6.26918 3.74076 5.55431 4.45611C4.11011 5.90106 3.29883 7.86038 3.29883 9.90331C3.29883 11.9462 4.11011 13.9056 5.55431 15.3505L7.22741 16.9994L9.47471 19.1829L9.62101 19.3127C10.4735 20.0035 11.722 19.9595 12.525 19.1829L15.2035 16.5759L16.4443 15.3505ZM10.9993 13.2C10.1241 13.2 9.28472 12.8523 8.66585 12.2335C8.04698 11.6146 7.69931 10.7752 7.69931 9.90001C7.69931 9.0248 8.04698 8.18543 8.66585 7.56656C9.28472 6.94769 10.1241 6.60001 10.9993 6.60001C11.8745 6.60001 12.7139 6.94769 13.3328 7.56656C13.9516 8.18543 14.2993 9.0248 14.2993 9.90001C14.2993 10.7752 13.9516 11.6146 13.3328 12.2335C12.7139 12.8523 11.8745 13.2 10.9993 13.2Z" fill="#A3CCAA"/>
  </svg>
);

const ResultsContainer = styled.div`
  width: 100%;
  gap: 20px;
  items-align: center;
  height: 500px;
`;

const ResultItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-bottom: 1px solid #ccc; 
  padding: 13px 0; 
`;

const ResultContent = styled.div`
  display: flex;
  align-items: center;
`;

const SVGContainer = styled.div`
  display: flex;
  align-items: center;
  display: inline-block;
`;

const TextContainer = styled.div`
  flex: 1;
`;

const ResultTitle = styled.h3`
  font-size: 25px;
  margin-bottom: 15px;
  color: #534340;
`;

const ResultAddress = styled.p`
  font-size: 18px;
  color: #717171;
`;

const Button = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #A3CCAA;
  margin-top: 10px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;



export default function SearchPlace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');
  const [name, setname] = useState('');
  const [add, setadd] = useState('');
  const [lat, setlat] = useState();
  const [lng, setlng] = useState();

  const nav = useNavigate();

  const handleSearch = async () => {
    try {
      const api_url = `/v1/search/local?query=${encodeURIComponent(searchTerm)}&display=5`;

      const response = await fetch(api_url, {
        headers: {
          'X-Naver-Client-Id': 'WDVId7gO_fHzG7oRtf5w',
          'X-Naver-Client-Secret': 'q4MDc81Fjb',
        },
      });

      if (!response.ok) {
        throw new Error('네이버 API 요청에 실패했습니다.');
      }

      const data = await response.json();
      console.log(data); // Add this line to log the API response
      setSearchResult(data);
    } catch (error) {
      console.error(error);
      setError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const convertCoordinates = (mapx, mapy) => {
    const longitude = (mapx / 10000000).toFixed(6);
    const latitude = (mapy / 10000000).toFixed(6);
    return { longitude, latitude };
  };

  const handleClickResult = (item) => {
    const { longitude, latitude } = convertCoordinates(item.mapx, item.mapy);
    setlat(latitude);
    setlng(longitude);
    setname(removeHTMLTags(item.title));
    setadd(item.address);
    console.log(item);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('lat', lat);
    sessionStorage.setItem('lng', lng);
    sessionStorage.setItem('add', add);
    nav('/upload-place');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setError(''); // 검색을 시작할 때 에러 메시지를 초기화
      handleSearch();
    }
  };

  const removeHTMLTags = (str) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = str;
    return tempElement.textContent || tempElement.innerText || "";
  };
  

  return (
    <Wrapper>
      <Title>
        <Blank/> <Blank/> <Blank/> <Blank/> <Blank/>
        <TitleDiv>
          <span> 명소 검색</span>
        </TitleDiv>
      </Title>
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 '지역 + 장소' 를 입력해주세요"
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchContainer>

      {error && <p>{error}</p>} {/* 에러가 있을 경우에만 출력 */}

      {searchResult && searchResult.items && (
        <ResultsContainer>
          {searchResult.items.map((item, index) => (
            <ResultItem key={index} onClick={() => handleClickResult(item)}>
              <ResultContent>
                <SVGContainer>{SVGImage}</SVGContainer>
                <TextContainer>
                  <ResultTitle>{removeHTMLTags(item.title)}</ResultTitle>
                  <ResultAddress>{removeHTMLTags(item.address)}</ResultAddress>
                </TextContainer>
              </ResultContent>
            </ResultItem>
          ))}
        </ResultsContainer>
      )}

      {!searchResult && (
        <div style={{ height: '400px', backgroundColor: '#ffffff' }}></div>
      )}

      <form onSubmit={onSubmit}>
        <Button type="submit" value={name + " 등록"} />
      </form>
    </Wrapper>
  );
}
