import { Link, Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 393px;
  height: 95%;
  align-items: center;
`;

const Top = styled.div`
    height: 15px;
    align-items: center;
    justify-content: center;
`;

const Out = styled.div`
    width: 95%;
    align-items: center;
    justify-content: center;
`;


export default function Layout(){
    const navigate = useNavigate();
    const onLogOut = async () => {
      const ok = confirm("Are you sure you want to log out?");
      if (ok) {
        await auth.signOut();
        navigate("/login");
      }
    };

    return(
        <Wrapper>
            <Top></Top>
            <Out><Outlet></Outlet></Out>
        </Wrapper>
    );
}
