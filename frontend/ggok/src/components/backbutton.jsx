import React from 'react';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack(); 
  };

  return (
    <button onClick={goBack}>뒤로 가기</button>
  );
};

export default BackButton;
