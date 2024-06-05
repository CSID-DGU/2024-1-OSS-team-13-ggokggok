import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import logo from "../../../others/img/logo-icon.png";
import profileImage from "../../../others/img/profile.png";
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, Blank } from "../../../styles/Styles";
import StarRating from "../../../components/starrating";
import UploadPlace from "../upload_feed/upload_place";
import { Link } from 'react-router-dom';

const ProfileImage = styled.img`
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background-color: white;
  margin-right: 10px;
`;

const Line = styled.hr`
  width: 100%;
  border: 1px solid #E8E8E8;
  margin: 5px 0;
`;

const Container = styled.div`
  padding: 20px;
  max-height: 700px;
  overflow-y: auto;
`;

const PostTitle = styled.h1`
  font-size: 25px;
  margin-bottom: 10px;
  text-align: left;
  display: flex; 
  white-space: nowrap; 
`;


const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  text-align: left;
  flex-direction: row; // Ensure flex direction is set to row
`;


const TimeAgo = styled.div`
  font-size: 15px;
  color: grey;
  margin-left: -60px;
  margin-top: 30px;
  white-space: nowrap;  // Ensure the text stays on a single line
  display: flex;
  align-items: center;
`;


const PostContent = styled.div`
  align-items: center;
  margin-bottom: 20px;
  font-size: 20px;
  text-align: left;

`;

const PostImage = styled.img`
  width: 250px;
  height: 250px;
  margin: 20px auto;
  display: block;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  position: sticky;
  bottom: 50px;
  background-color: white;
  padding-top: 10px;
  display: flex;
  z-index: 1000;

`;


const CommentSection = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 20px;
  text-align: left;
  align-items: left;
`;

const CommentTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: left;
  align-items: left;
`;

const Comment = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
`;

const CommentContent = styled.div`
  font-size: 16px;
  padding-top: 0;
  margin-bottom: 10px;
  width: 270px;
`;

const CommentTime = styled.div`
white-space: nowrap; 
  font-size: 14px;
  color: grey;
  margin-left:auto;
  width: 50px;
`;

const InputField = styled.input`
  width: 280px;
  height: 50px;
  border: none;
  padding: 0 15px;
  font-size: 15px;
`;

const TextAreaField = styled.textarea`
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  resize: none;
`;

const Button = styled.button`
  display: block;
  width: 50px;
  height: 50px;
  background-color: #a3ccaa;
  margin: 0px;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

const CommentContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
`;

const PlaceInfoContainer = styled.div`
  display: flex;
  background-color: #d6e7d2;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: left;
`;

const PlaceName = styled.div`
  font-size: 23px;
  font-weight: bold;
  padding: 3px 10px 0 5px;
`;

const PlaceAddress = styled.div`
  font-size: 14px;
  margin-top: 10px;
  padding-left: 0;
  color: grey;
`;

const PlaceReview = styled.div`
  margin-left: auto;
  display: flex;

  span {
   padding: 5px 10px 15px 5px;
  }
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 90%;
`;

const SubArea = styled.input`
  height: 50px;
  border: none;
  border-bottom: 2px solid #E8E8E8;
  outline: none; 
  margin-bottom: 10px;
  margin-top: 30px;

  &::placeholder {
    font-size: 32px;
    font-family: "TTLaundryGothicB";
    color: #959595;
  }
`;

const Icon = styled.div`
  display: flex;
`;

const LocArea = styled.button`
    height: 40px;
    border: none;
    background-color: white;
    margin-bottom: 5px;
    font-size: 20px;
    color: black;
    padding-bottom: 30px;
    font-family: "TTLaundryGothicB";
`;

const TextArea = styled.textarea`
  border: none;
  resize: none;
  font-size: 20px;
  height: 285px;

  &::placeholder {
    font-size: 20px;
    font-family: "TTLaundryGothicB";
    color: #959595;
  }

  &:focus {
    font-size: 20px;
    font-family: "TTLaundryGothicB";
    outline: none;
    border-color: #A3CCAA;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #A3CCAA;
  text-align: center;
  border-radius: 20px;
  border: 2px solid #A3CCAA;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #A3CCAA;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function Place_info() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/post/${parseInt(id)}/`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/comments/${parseInt(id)}/`);
        setComments(response.data.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [id]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  const getUserId = () => {
    const sessionData = sessionStorage.getItem('user');
    if (sessionData) {
      try {
        const userData = JSON.parse(sessionData);
        return parseInt(userData.data.id);
      } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
      }
    } else {
      console.error('Session data not found.');
      return null;
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const postData = {
      content: comment,
      post: parseInt(id),
      author: getUserId()
    };
    try {
      await axios.post(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/comments/${id}/`, postData);
      setComment("");
      window.location.reload();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/post/${parseInt(id)}/`, {
        data: { 
          post_id: parseInt(id),
          author: getUserId()
        }
      });
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = () => {

    setIsEditing(true);
    setEditTitle(data.subject);
    setEditContent(data.content);
    setEditImage(data.image);
  };

  const handleSaveEdit = async () => {
    const postData = new FormData();
    postData.append('subject', editTitle);
    postData.append('content', editContent);
    postData.append('lat', data.lat);
    postData.append('long', data.long);
    postData.append('address', data.address);
    postData.append('name', data.name);
    postData.append('public', data.public);
    postData.append('review', data.review);
    postData.append('category', data.category);
    postData.append('author', data.author);
    if (editImage) {
      postData.append('image', editImage);
    }

    try {
      const response = await axios.put(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/post/${parseInt(id)}/`, postData);
      setIsEditing(false);
      setData(response.data.data); // Update data
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
      } else {
        console.error('Error saving edited post:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    setEditImage(e.target.files[0]);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const userInfo = () => {
    const session = sessionStorage.getItem('user');
    const user = JSON.parse(session);
    return user.data;
  }

  return (
    <Wrapper>
      {!isEditing && (
      <Title>
        <Blank/><Blank/><Blank/>
        <TitleDiv><LogoImage src={logo} alt="Logo" /><span>우리 지역</span></TitleDiv>
        <Blank/>
        {data && (
          <>
            {data.author === userInfo().id ? (
              <>
                <Link to={`/upload-place/${parseInt(id)}`} style={{ fontSize: "16px", color: "#a3ccaa", paddingRight: "5px"}}>수정</Link>

                {/* <ExtraButton onClick={handleEditPost}>수정</ExtraButton> */}
                <ExtraButton onClick={handleDeletePost}>삭제</ExtraButton>
              </>
            ) : (
              <div></div>
            )}
          </>
        )}
      </Title>
      )}
      <Container>
        {data && (
          <>
            {isEditing ? (
              <UploadPlace/>
            ) : (
                 <>
              <PostHeader>
                <div>
                  <PostTitle>{data.subject}</PostTitle>
                  <ProfileImage src={profileImage} alt="User profile" />
                  탐험가 1
                </div>
                <TimeAgo>{formatTimeAgo(data.create_date)}</TimeAgo>
              </PostHeader>
            
               <PlaceInfoContainer>
                 <svg width="25" height="25" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M85.963 80.2413C93.5123 72.6881 97.7531 62.4463 97.7531 51.7673C97.7531 41.0883 93.5123 30.8464 85.963 23.2933C82.2262 19.5539 77.7891 16.5875 72.9054 14.5637C68.0217 12.5398 62.787 11.4981 57.5005 11.4981C52.2141 11.4981 46.9794 12.5398 42.0957 14.5637C37.212 16.5875 32.7749 19.5539 29.038 23.2933C21.4888 30.8464 17.248 41.0883 17.248 51.7673C17.248 62.4463 21.4888 72.6881 29.038 80.2413L37.7838 88.8605L49.531 100.274L50.2958 100.953C54.752 104.564 61.2783 104.334 65.4758 100.274L79.477 86.6468L85.963 80.2413ZM57.5005 69C52.9256 69 48.538 67.1826 45.303 63.9476C42.068 60.7126 40.2505 56.325 40.2505 51.75C40.2505 47.175 42.068 42.7874 45.303 39.5524C48.538 36.3174 52.9256 34.5 57.5005 34.5C62.0755 34.5 66.4631 36.3174 69.6981 39.5524C72.9331 42.7874 74.7506 47.175 74.7506 51.75C74.7506 56.325 72.9331 60.7126 69.6981 63.9476C66.4631 67.1826 62.0755 69 57.5005 69Z" fill="#77605B"/>
                 </svg>
                 <div>
                 <div style={{ display: "flex" }}>
                     <PlaceName>{data.name}</PlaceName>
                     <PlaceReview> 
                       <div>
                         <svg width="20" height="20" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M12.8979 2L16.1313 9.00833L23.7958 9.91771L18.1292 15.1573L19.6333 22.7281L12.8979 18.9583L6.1625 22.7292L7.66667 15.1583L2 9.91667L9.66563 9.00729L12.8979 2Z" fill="#FBE8B0" stroke="#717171" stroke-width="2.5" stroke-linejoin="round"/>
                         </svg>
                       </div>
                         <span>{data.review}</span>
                     </PlaceReview>
                   </div>
                   <PlaceAddress>{data.address}</PlaceAddress>
                 </div>
               </PlaceInfoContainer>
                 
               <PostContent>
                 {data.content.split('\n').map((line, index) => (
                   <React.Fragment key={index}>
                     {line}
                     <br />
                   </React.Fragment>
                 ))}
               </PostContent>
               {data.image && <PostImage src={data.image} alt="Post image" />}
               <Line />
             </>
            )}
          
            {!isEditing && (
              <>
                <CommentSection>
                  <CommentTitle>댓글 {comments.length}개</CommentTitle>
                  {comments.map((comment) => (
                    <Comment key={comment.id}>
                      <div>
                        <ProfileImage src={profileImage} alt="User profile" />
                        <Nickname>{comment.nickname}</Nickname>
                      </div>
                      <div>
                        <CommentContent>{comment.content}</CommentContent>
                        <CommentTime>{formatTimeAgo(comment.created_at)}</CommentTime>
                      </div>
                    </Comment>
                  ))}
                </CommentSection>
                <FormContainer onSubmit={handleSubmitComment}>
                  <CommentContainer>
                    <InputField
                      type="text"
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="댓글을 입력하세요"
                    />
                    <Button type="submit">등록</Button>
                  </CommentContainer>
                </FormContainer>
              </>
            )}
          </>
        )}
      </Container>
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <p>게시물이 성공적으로 삭제되었습니다.</p>
            <button onClick={handleCloseModal}>확인</button>
          </div>
        </div>
      )}
    </Wrapper>
  );
}
