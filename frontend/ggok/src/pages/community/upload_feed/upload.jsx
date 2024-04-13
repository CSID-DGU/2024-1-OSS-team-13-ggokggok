import { styled } from "styled-components";


const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  padding: 55px 0px;
`;

const Title = styled.h1`
  font-size: 30px;
  color: #534340;
  
`;

const Subin = styled.input`


`;

const Addressin = styled.input`

`;

const Textin = styled.input`


`;

function Upload_form() {

    async function fetchData() {
        try {
          const response = await axios.get('http://localhost:8000/api/community/post/');
          setPostData(response.data);
          console.log(postData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }


    

    return(
        <Wrapper>
            <div>
                <Title>명소 등록</Title>
                <button>완료</button>

            </div>
            <Subin></Subin>
            <Addressin></Addressin>
            <Textin></Textin>

        </Wrapper>
      
    );
  }
  
  export default Upload_form