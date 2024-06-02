import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import axios from "axios";

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

const RegionButton = styled.div`
  height: 46px;
  width: 80%;
  margin: auto;
  border-radius: 50px;
  background-color: #A3CCAA;
  display: flex;
  position: relative;
  margin-bottom: 10px;
`;

const Slider = styled.div`
  position: absolute;
  height: 100%;
  width: 45%;
  background-color: #A3CCAA;
  border-radius: 50px;
  transition: transform 0.3s ease;
  transform: ${({ selectedOption }) =>
    selectedOption === "region1" ? "translateX(0%)" : "translateX(100%)"};
`;

const RegionButtonText = styled.button`
  flex-grow: 1;
  border: none;
  background: none;
  color: ${({ selected, theme }) => (selected ? theme.defaultColor : theme.selectedColor)};
  font-size: 17px;
  z-index: 1;
  cursor: pointer;
  background-color: ${({ selected, theme }) => (selected ? theme.defaultBg : theme.selectedBg)};
  border-radius: 50px;
  &:focus {
    outline: none;
  }
`;

const InfoContainer = styled.div`
  margin-top: 10px;
  height: 487px;
  width: 392px;
  background-color: #ECF5EE;
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

 &:active,
  &:focus,
  &.active {
    outline: 3px solid #4C7E6F;
  }
`;

const Button = styled.button`
  border: none;
  background-color: white;
  padding: 14px 0px;
  width: 313px;
  border-radius: 50px;
  font-size: 16px;
`;

const theme = {
  selectedColor: "#A3CCAA",
  defaultColor: "#FFFFFF",
  selectedBg: "#FFFFFF",
  defaultBg: "#A3CCAA",
};

const Popup = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  width: 345px;
  align-items: center;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const PopupButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: 1px solid #A3CCAA;
  width: 250px;
  font-size: 18px;
  background-color: ${({ confirm }) => (confirm ? '#A3CCAA' : '#FFFFFF')};
  color: ${({ confirm }) => (confirm ? '#FFFFFF' : '#A3CCAA')};
  margin: 5px;

  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export default function SetRegion() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [regionInfo, setRegionInfo] = useState({ region1: '', region2: '' });
  const [selectedOption, setSelectedOption] = useState("region1");
  const [error, setError] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const sessionData = JSON.parse(sessionStorage.getItem('user'));
        const userId = sessionData.data.id;
        const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/?myuser=${userId}`);
        const result = response.data;
        if (result.success) {
          const userData = result.data[0];
          setRegionInfo({ region1: userData.region1, region2: userData.region2 });
          if (!userData.region1 && !userData.region2) {
            setSelectedOption("region1");
          } else if (userData.region1 && !userData.region2) {
            setSelectedOption("region2");
          }
        } else {
          setError("사용자 정보를 가져오는데 실패했습니다.");
        }
      } catch (error) {
        setError("사용자 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSave = async () => {
    sessionStorage.setItem('selectedRegion', selectedOption);
    setPopupVisible(true);
  };

  const handleDelete = async () => {
    const sessionData = JSON.parse(sessionStorage.getItem('user'));
    const userId = sessionData.data.id;
    const dataToSend = selectedOption === "region1" ? { region1: "" } : { region2: "" };

    try {
      const response = await axios.put(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/${userId}/`, dataToSend);
      if (response.data.success) {
        const updatedRegionInfo = selectedOption === "region1" ? { ...regionInfo, region1: "" } : { ...regionInfo, region2: "" };
        setRegionInfo(updatedRegionInfo);
        setPopupVisible(false);
        setConfirmDelete(false);
      } else {
        setError("지역 삭제에 실패했습니다.");
      }
    } catch (error) {
      setError("지역 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const getLocation = () => {
    if (selectedOption === "region1") {
      return regionInfo.region1;
    } else if (selectedOption === "region2") {
      return regionInfo.region2;
    } else {
      return "선택된 지역이 없습니다.";
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleConfirm = () => {
    setPopupVisible(false);
    navigate("/search-region"); 
  };

  const handleCancel = () => {
    setPopupVisible(false);
    setConfirmDelete(false);
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);
    setPopupVisible(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Title>내 지역 설정</Title>

        <InfoContainer>
          <RegionName> 내 지역 정보 </RegionName>
          <Line />

          <RegionButton>
            <Slider selectedOption={selectedOption} />
            <RegionButtonText
              selected={selectedOption === "region1"}
              theme={theme}
              onClick={() => handleOptionChange("region1")}
            >
              {regionInfo.region1}
            </RegionButtonText>
            <RegionButtonText
              selected={selectedOption === "region2"}
              theme={theme}
              onClick={() => handleOptionChange("region2")}
            >
              {regionInfo.region2}
            </RegionButtonText>
          </RegionButton>

          {getLocation() !== "" ? ( 
          <ButtonContainer>
            <Location>{getLocation()}</Location>
            <OptionContainer>
              <Option>거주지</Option>
              <Option>직장 및 학교</Option>
              <Option>기타</Option>
            </OptionContainer>
            <Button onClick={handleSave}> 수정하기 </Button>
            <Button onClick={handleDeleteClick}> 삭제하기 </Button>
          </ButtonContainer>
          ) : (
            <Button onClick={handleSave}> 지역 추가하기 </Button>
          )}
            
        </InfoContainer>
      </Wrapper>

      {popupVisible && (
        <>
          <PopupOverlay onClick={handleCancel} />
          <Popup>
            <h3>{confirmDelete ? `${getLocation()} 삭제하시겠습니까?` : `${getLocation()} 수정하시겠습니까?`}</h3>
            <div>
              <PopupButton confirm onClick={confirmDelete ? handleDelete : handleConfirm}>예</PopupButton>
              <PopupButton onClick={handleCancel}>아니오</PopupButton>
            </div>
          </Popup>
        </>
      )}
    </ThemeProvider>
  );
}
