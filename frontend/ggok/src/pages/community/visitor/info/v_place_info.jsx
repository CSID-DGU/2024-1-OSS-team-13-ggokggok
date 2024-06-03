import { styled } from "styled-components";
import logo from "../../../../others/img/logo-icon.png"
import leftlogo from "../../../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, BackButton } from "../../../../styles/Styles"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "../../../../components/starrating";


const Container = styled.div`
  padding: 20px;
  max-height: 900px;
  overflow-y: auto;
`;

const PostTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
  text-align: left;
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
`;

const PostContent = styled.div`
  margin-bottom: 20px;
  font-size: 23px;
  text-align: left;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f8f5;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: left;
`;

const LocationIcon = styled.div`
  margin-right: 30px;
`;

const LocationText = styled.div`
  font-size: 30px;

  span {
    font-size: 15px;
  }
`;

const FormContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: white;
  padding-top: 10px;
`;

const CommentSection = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const CommentTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: left;
`;

const Comment = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
`;

const CommentContent = styled.div`
  font-size: 16px;
`;

const CommentTime = styled.div`
  font-size: 14px;
  color: grey;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const TextAreaField = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  resize: none;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #a3ccaa;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

const DeleteButton = styled.button`
  margin-left: 10px;
`;

const EditButton = styled.button`
  margin-left: 10px;
`;



export default function V_Place_info(){

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);

  
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


    return (
      <Wrapper>
      <Title>
        <TitleDiv><LogoImage src={logo} alt="Logo" /><span>지역</span></TitleDiv>
      </Title>
      <Container>
        {data && (
          <>
       
              <>
                <PostTitle>{data.subject}
                </PostTitle>
                <PostHeader>
                  <Nickname></Nickname>
                  <TimeAgo>{formatTimeAgo(data.create_date)}</TimeAgo>
                </PostHeader>
                <LocationContainer>
                  <LocationIcon>
                    <LocationText>
                      📍  {data.name}  <br /> 
                      <span>{data.address}</span>
                      <StarRating totalStars={5} selectedStars={data.review} /><br /> 
                    </LocationText>
                  </LocationIcon>
                </LocationContainer>
                <PostContent>
                  <p>{data.content}</p>
                  {data.image && <PostImage src={data.image} alt="Post" />}
                </PostContent>
              </>
            
          </>
        )}
        <CommentSection>
          {comments.length > 0 && <CommentTitle>댓글</CommentTitle>}
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <CommentContent>{comment.content}</CommentContent>
              <CommentTime>{formatTimeAgo(comment.create_date)}</CommentTime>
            </Comment>
          ))}
        </CommentSection>
      </Container>
    </Wrapper>
    );
}
