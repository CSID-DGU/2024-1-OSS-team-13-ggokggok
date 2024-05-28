import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { Title, Wrapper, Blank, TitleDiv } from "../../styles/Styles";
import Modal from '../../components/modal'; // Ensure Modal component is imported

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
  padding: 10px 20px;
  gap: 30px;
  align-items: center;
  height: 500px;
`;

const ResultItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-bottom: 1px solid #ccc; 
  padding: 18px 0; 
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
  margin-left: 10px; 
`;

const ResultTitle = styled.h3`
  font-size: 25px;
  margin-bottom: 15px;
  color: #534340;
`;

const Line = styled.hr`
  width: 50%;
  border: 3px solid #534340;
  border-radius: 50px;
`;


const Location = styled.div`
  border: none;
  background-color: white;
  padding: 14px 0px;
  border-radius: 50px;
  font-size: 23px;
  width: 100%;
`;


const OptionContainer = styled.div` 
  width: 100%;
  display: flex;
  justify-content: space-between; 
`;

const Option = styled.button`
  flex-grow: 1;
  margin: 0 10px 0 0;
  border: none;
  background-color: white;
  padding: 14px;
  border-radius: 50px;
  font-size: 23px;
`;

const Button = styled.input`
  display: block;
  font-size: 23px;
  width: 100%;
  padding: 10px;
  background-color: #A3CCAA;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;


const ButtonContainer = styled.div`
  width: 95%;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 15px;
`;


const ModifyButton = styled.button`
  border: none;
  background-color: white;
  padding: 14px 0px;
  width: 100%;
  border-radius: 50px;
  font-size: 23px;
`;

const DeleteButton = styled.button`
  border: none;
  background-color: white;
  padding: 14px 0px;
  width: 100%;
  border-radius: 50px;
  font-size: 23px;
`;

const RegionButton = styled.button`
  height: 46px;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  margin: 20px;
  width: 95%;
  font-size: 17px;
  background-color : #A3CCAA;
  color: #FFFFFF;
`;

const removeHtmlTags = (str) => {
  return str.replace(/<[^>]*>/g, '');
};

export default function SearchPlace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const nav = useNavigate();

  const handleSearch = async () => {
    try {
      const api_url = `/v1/search/local?query=${encodeURIComponent(searchTerm)}&display=5`;
      const response = await fetch(api_url, {
        headers: {
          'X-Naver-Client-Id': 'WDVId7gO_fHzG7oRtf5w',
          'X-Naver-Client-Secret': 'q4MDc81Fjb',
        },
        params: {
          display: 5,
          start: 1,
        },
      });

      if (!response.ok) {
        throw new Error('네이버 API 요청에 실패했습니다.');
      }

      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error(error);
      setError('검색어를 다시 입력해주세요.');
    }
  };

  const convertCoordinates = (mapx, mapy) => {
    const longitude = (mapx / 10000000).toFixed(6);
    const latitude = (mapy / 10000000).toFixed(6);
    return { longitude, latitude };
  };

  const handleClickResult = (item) => {
    const { longitude, latitude } = convertCoordinates(item.mapx, item.mapy);
    setLat(latitude);
    setLng(longitude);
    setName(removeHTMLTags(item.title));
    setAddress(item.address);
    console.log(item);
  };

  function removeHTMLTags(str) {
    return str.replace(/<[^>]*>/g, '');
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('lat', lat);
    sessionStorage.setItem('lng', lng);
    sessionStorage.setItem('address', address);
    setModalOpen(true);
  };

  const uniqueByThirdWord = (items) => {
    const seen = new Set();
    return items.filter(item => {
      const thirdWord = item.address.split(' ')[2];
      if (!seen.has(thirdWord)) {
        seen.add(thirdWord);
        return true;
      }
      return false;
    });
  };

  return (
    <Wrapper>
      <Title>
        <Blank />
        <TitleDiv>내 지역 검색</TitleDiv>
      </Title>
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 'OO동' 으로 입력해주세요"
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchContainer>

      {error && <p>{error}</p>} {/* 에러가 있을 경우에만 출력 */}

      {searchResult && searchResult.items && (
        <ResultsContainer>
          {uniqueByThirdWord(searchResult.items).slice(0, 3).map((item, index) => (
            <ResultItem key={index} onClick={() => handleClickResult(item)}>
              <ResultContent>
                <SVGContainer>{SVGImage}</SVGContainer>
                <TextContainer>
                  <ResultTitle>{item.address.split(' ').slice(0, 3).join(' ')}</ResultTitle>
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
        <Button type="submit" value={address.split(' ')[2] + " 등록"} />
      </form>

     
      <div>
        {modalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <Title>
              <Blank/><Blank/>
              <TitleDiv>내 지역 정보</TitleDiv>
            </Title>

            <Line/>

            <RegionButton>
              <button onClick={() => handleOptionClick("Option 1")}>Option 1</button>
              <button onClick={() => handleOptionClick("Option 2")}>Option 2</button>
            </RegionButton>

            

            

            <ButtonContainer>
            <Location>{address.split(' ')[2]}</Location>
            <OptionContainer>
              <Option>거주지</Option>
              <Option>직장 및 학교</Option>
              <Option>기타</Option>
            </OptionContainer>

              <ModifyButton>수정하기</ModifyButton>
              <DeleteButton>삭제하기</DeleteButton>
            </ButtonContainer>
           
          </Modal>
        )}
      </div>
    </Wrapper>
  );
}
