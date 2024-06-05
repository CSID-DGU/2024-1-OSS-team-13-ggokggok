import { styled } from "styled-components";
import logo from "../../../others/img/logo-icon.png"
import leftlogo from "../../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, BackButton, Blank } from "../../../styles/Styles"
import profileImage from "../../../others/img/profile.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const ProfileImage = styled.img`
width: 30px;
height: 30px;
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
  max-height: 900px;
  overflow-y: auto;
`;

const PostTitle = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
  text-align: left;
  display: flex;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  text-align: left;
`;

const Nickname = styled.div`
  font-size: 18px;
`;

const TimeAgo = styled.div`
  font-size: 18px;
  color: grey;
  margin-left: auto;
`;

const PostContent = styled.div`
  align-items: center;
  margin-bottom: 20px;

  font-size: 20px;
  text-align: left;
`;

const PostImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 20px auto;
  display: block;
  border-radius: 10px;
  margin-bottom: 20px;
`;


const FormContainer = styled.div`
  position: sticky;
  bottom: 10px;
  background-color: white;
  padding-top: 10px;
  display: flex;
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
  font-size: 14px;
  color: grey;
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

export default function Feed_info() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/post/${parseInt(id)}/`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/comments/${parseInt(id)}/`);
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
      await axios.post(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/comments/${id}/`, postData);
      setComment("");
      window.location.reload();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const deleteData = {
        post_id: parseInt(id),
        author: getUserId()
      };
      
      await axios.delete(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/post/${parseInt(id)}/`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: deleteData // 데이터를 data 속성으로 전달
      });
  
      alert("게시물이 성공적으로 삭제되었습니다.");

      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  

  const handleEditPost = () => {
    setIsEditing(true);
    setEditTitle(data.subject);
    setEditContent(data.content);
  };

  const handleSaveEdit = async () => {
    try {
      const postData = {
        author: data.author,
        subject: editTitle,
        content: editContent,
        post_region: data.post_region,
        modify_date: new Date().toISOString()
      };
      console.log("Sending POST data:", postData);
      
      const response = await axios.put(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/post/${parseInt(id)}/`, postData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
  
      console.log("Server response:", response.data);
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
        console.error('HTML response:', error.response.data);
      } else {
        console.error('Error saving edited post:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const userInfo = () => {
    const session = sessionStorage.getItem('user');
    const user = JSON.parse(session);
    return user.data;
  }

  return (
    <Wrapper>
      <Title>
        <Blank/><Blank/><Blank/>
        <TitleDiv><LogoImage src={logo} alt="Logo" /><span>우리 지역</span></TitleDiv>
        <Blank/>
        {data && (
          <>
            {data.author == userInfo().id && (
              <>
                <ExtraButton onClick={handleEditPost}>수정</ExtraButton>
                <Blank/>
                <ExtraButton onClick={handleDeletePost}>삭제</ExtraButton>
              </>
            )}
          </>
        )}
      </Title>
      
      <Container>
        {data && (
          <>
            {isEditing ? (
              <>
                <InputField
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="제목"
                />
                <TextAreaField
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="내용"
                  rows="10"
                />
                <ButtonContainer>
                  <Button onClick={handleSaveEdit}>저장</Button>
                  <Button onClick={handleCancelEdit}>취소</Button>
                </ButtonContainer>
              </>
            ) : (
              <>
                <PostTitle>
                  <div>{data.subject}</div>
                  <Blank/><Blank/>
                  <TimeAgo>{formatTimeAgo(data.create_date)}</TimeAgo>
                </PostTitle>
                <Line/>
                <PostHeader>
                  <Nickname></Nickname>
                </PostHeader>
                <PostContent>
                  <p>{data.content}</p>
                  {data.image && <PostImage src={data.image} alt="Post" />}
                </PostContent>
              </>
            )}
          </>
        )}
        <CommentSection>
          {comments.length > 0 && <CommentTitle>댓글</CommentTitle>}
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <CommentContent><ProfileImage src={profileImage} alt="Profile" /> {comment.content}</CommentContent>
              <CommentTime>{formatTimeAgo(comment.create_date)}</CommentTime>
            </Comment>
          ))}
        </CommentSection>
        <FormContainer>
          <form onSubmit={handleSubmitComment}>
            <CommentContainer>
              <InputField
                required
                maxLength={100}
                onChange={handleCommentChange}
                value={comment}
                placeholder="댓글을 입력해주세요"
              />
              <Button type="submit">등록</Button>
            </CommentContainer>
          </form>
        </FormContainer>
      </Container>
    </Wrapper>
  );
}