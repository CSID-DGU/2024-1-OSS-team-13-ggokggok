import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 400px;
  height: 85%;
`;

export const Blank = styled.div`
  width: 25px;
  margin: 0px;
`;

export const Title = styled.h1`
  width: 100%;
  display: flex;
  font-size: 35px;
  align-items: center;
  text-align: center;
`;

export const SubTitle = styled.h1`
  color: #534340;
`;

export const LogoImage = styled.img`
  width: 45px; 
  height: auto; 
  margin-left: 0px;
`;

export const TitleDiv = styled.div`
  // width: 80%;
  align-items: center;
  text-align: center;
  display: flex;
  span { margin-left: 10px; }
  div { padding-left: 34px}
  img { margin-bottom: -7px; }
`;

export const BackButton = styled.button`
  border: none;
  background-color: white;
`;


export const ExtraButton = styled.button`
  border: none;
  background-color: white;
  color: #A3CCAA;
  font-size: 16px;
  font-weight: bold;
`;


export const MainContainer = styled.div`
  
  text-align: center;

  div {
    font-size: 24px;
    padding: 5px 0 0 0;
  }
  
  .location {
    display: flex;
  }

  span {
    justify-content: center;
    display: flex;
    margin: 225px 0;
    font-size: 20px;
    width: 100%;
  }
  
  .under {
    display: flex;
    width: 100%;
  }

  .visit {
    font-size: 20px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    padding: 10px;
    text-align: center;
    width: 300px;
  }

  .buttonContainer {
    display: flex;
    justify-content: flex-end;
    margin-right: 0px;
    width: 150px;
    position: right;
  }

  .buttonContainer > div {
    padding-right: 0px;
  }

  .locButton {
    width: 50px;
    heigth: 50px;
    background-color: #FFFFFF;
  }


  p {
    color: #A3CCAA;
  }
 
 
`;

