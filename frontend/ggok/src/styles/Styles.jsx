import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 80%;

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
    padding: 5px 0;
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
    flex-direction: column;
    width: 100%;
  }

  .visit {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    margin-top: 5px;
    padding: 10px;
  }

  .buttonContainer {
    display: flex;
    justify-content: center;
    
  }

  .buttonContainer > div {
    margin: 0 10px; 
    
  }


  .locButton {
    border-radius: 50px;
   
    width:50px;
    heigth:50px;
  
    background-color: #FFFFFF;
  }


  p {
    color: #A3CCAA;
  }
 
 
`;

