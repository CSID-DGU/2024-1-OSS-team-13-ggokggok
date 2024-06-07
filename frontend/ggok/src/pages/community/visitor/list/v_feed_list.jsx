import { styled } from "styled-components";
import logo from "../../../../others/img/logo-icon.png"
import leftlogo from "../../../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton } from "../../../../styles/Styles"
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import BackButton from "../../../../components/backbutton";

const SubTitle = styled.h2`
  font-size: 20px;
  margin-left: 0px;
  text-align: left;
  padding: 20px 0;
`;

const ContentBox = styled.div`
  height: 143px;
  width: 95%;
  border: 1px solid #C9B6A9;
  border-radius: 10px;
  margin: 15px 0 0;
  padding: 15px;
`;

const ContentBox2 = styled.div`
  height: 550px;
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

const WriteBtn = styled.div`
    border: none;
    background-color: white;
    color: #A3CCAA;
    font-size: 16px;
    font-weight: bold;
`;  

export default function V_Feed_list(){
    const {id} = useParams();

    const [getData, setGetData] = useState([]);

    async function fetchData() {
        try {
          const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/?region=${id}`);
          setGetData(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {fetchData();}, []);

    console.log(getData);


    return (
        <Wrapper>
          <Title>
            <TitleDiv><BackButton></BackButton><LogoImage src={logo} alt="Logo" /><span>{id} 지역 커뮤니티</span></TitleDiv>
          </Title>            
            <SubTitle>
            <h2> 지역 소식</h2>
              <ContentBox2>
                {getData.length > 0 ? (
                        getData.map((data) => (
                          <Link to={data ? `/visitor-feed-info/${data.id}` : "/"}
                          style={{textDecoration: "none"}}>

                            <div style={{display: 'flex'}}>
                                <ContentImg src={`${data.image}`}></ContentImg>
                                <div>
                                    <h3>{data.subject}</h3>
                                    <p>{data.content}</p>
                                </div>
                            </div>
                          </Link>
                    ))): (<h1>게시글이 없습니다</h1>)}
                </ContentBox2>
            </SubTitle>
        </Wrapper>
    );
}
