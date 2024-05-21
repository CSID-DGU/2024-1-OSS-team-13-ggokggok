import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

// 초기 프로필 상태 정의
const initialProfileState = {
  profileImage: "",
  resident: "",
  username: "",
};

// 프로필 정보를 가져오는 함수
const fetchProfileInfo = async () => {
  try {
    const response = await axios.get("URL");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile info:", error);
    return null;
  }
};

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #eaf4ec;
  padding: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResidentInfo = styled.div`
  margin-bottom: 5px;
`;

const UserName = styled.div`
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  background-color: #F6F6F6;
  border-radius: 20px; 
  overflow: hidden; 
`;

const SlidingButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: ${({ active }) => (active ? "#534340" : "#F6F6F6")};
  color: ${({ active }) => (active ? "#ffffff" : "#E8E8E8")};

  &:hover {
    background-color: ${({ active }) => (active ? "#534340" : "#F0F0F0")};
  }
`;



const MyPage = () => {
  const [profile, setProfile] = useState(initialProfileState);
  const [selectedButton, setSelectedButton] = useState("my-posts");

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await fetchProfileInfo();
      if (profileData) {
        setProfile(profileData);
      }
    };
    fetchProfile();
  }, []);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
      <ProfileWrapper>
        <ProfileImage src={profile.profileImage} alt="Profile" />
        <UserInfoWrapper>
          <ResidentInfo>{profile.resident}</ResidentInfo>
          <UserName>{profile.username}</UserName>
        </UserInfoWrapper>
      </ProfileWrapper>

      <ButtonContainer>
        <SlidingButton
          active={selectedButton === "my-posts"}
          onClick={() => handleButtonClick("my-posts")}
        >
          내 게시물
        </SlidingButton>
        <SlidingButton
          active={selectedButton === "my-roadmap"}
          onClick={() => handleButtonClick("my-roadmap")}
        >
          내 로드맵
        </SlidingButton>
      </ButtonContainer>
    </>
  );
};

export default MyPage;
