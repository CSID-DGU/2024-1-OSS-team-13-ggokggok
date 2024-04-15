import styled from 'styled-components';

export const Wrapper = styled.div`


`;

export const Title = styled.h1`
  width: 100%;
  display: flex;
  font-size: 35px;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 45px; 
  height: auto; 
  margin-left: 0px;
`;

export const TitleDiv = styled.div`
  width: 70%;
  align-items: center;

  span { margin-left: 10px; }

  img { margin-bottom: -7px; }
`;



export const BackButton = styled.button`
  border: none;
  background-color: white;
`;


export const WriteButton = styled.button`
  border: none;
  background-color: white;
  color: #A3CCAA;
  font-size: 16px;
  font-weight: bold;
`;

const StyleSheet = {
  Wrapper,
  Title,
  LogoImage,
  TitleDiv,
  BackButton,
  WriteButton,
};

export default StyleSheet;