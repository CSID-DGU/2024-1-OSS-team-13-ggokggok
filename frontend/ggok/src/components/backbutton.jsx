import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import leftlogo from "../others/img/left-button.png";

const Button = styled.button`
    border: none;
    background-color: white;
`;

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  return (
  <Button onClick={handleBack}>
    <img src={leftlogo} />
  </Button>
  )
};

export default BackButton;
