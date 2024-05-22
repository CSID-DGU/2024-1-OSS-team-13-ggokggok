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
    const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/post_search/?community=${sessionStorage.getItem('user').data.id}`);
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

const ContentBox2 = styled.div`
  height: 300px;
  width: 100%;
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  margin: 15px 0 0;
  overflow: auto;

  > div {
    font-size: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #C9B6A9;
  }

  h3 {
    color: black;
    padding: 5px 0;
  }

  p {
    font-size: 14px;
    padding: 5px 0 15px;
  }
`;

const ContentImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 10px;
  margin: 0 10px 0 0;
`;

const MyPage = () => {
  const [profile, setProfile] = useState(initialProfileState);
  const [selectedButton, setSelectedButton] = useState("my-posts");
  const [posts, setPosts] = useState([]);
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await fetchProfileInfo();
      if (profileData) {
        setProfile(profileData);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (selectedButton === "my-posts") {
      fetchMyPosts();
    } else if (selectedButton === "my-roadmap") {
      fetchMyRoadmap();
    }
  }, [selectedButton]);

  const fetchMyPosts = async () => {
    try {
      const response = await axios.get('https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/?community=1');
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchMyRoadmap = async () => {
    try {
      const response = await axios.get('https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/?place=1');
      setRoadmap(response.data.data);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
    }
  };

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

      <ContentBox2>
        {selectedButton === "my-posts" && posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.id} to={`/feed-info/${post.id}`}>
              <div style={{display: 'flex'}}>
                <ContentImg src="/"></ContentImg>
                <div>
                  <h3>{post.subject}</h3>
                  <p>{post.content}</p>
                </div>
              </div>
            </Link>
          ))
        ) : selectedButton === "my-roadmap" && roadmap.length > 0 ? (
          roadmap.map((place) => (
            <Link key={place.id} to={`/place-info/${place.id}`}>
              <div style={{display: 'flex'}}>
                <ContentImg src="/"></ContentImg>
                <div>
                  <h3>{place.name}</h3>
                  <p>{place.content}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )}
      </ContentBox2>
    </>
  );
};

export default MyPage;
