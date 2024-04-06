import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/login";
import Map from "./pages/main/main_map";
import CreateAccount from "./pages/login/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Protected_login from "./components/protected_login";
import Layout from "./components/layout";
import Community from "./pages/community/community";
import Intro from "./pages/login/intro";
import Feed from "./pages/main/main_feed";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


`;

const router = createBrowserRouter([
  {
    path:"/",
    element: <Protected_login> <Layout/> </Protected_login>,
    children: [
      {
        path:"",
        element: <Map/>,
      },
      {
        path:"community",
        element: <Community/>,

      },
      {
        path:"feed",
        element: <Feed/>,

      },
    ]
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/create-account",
    element: <CreateAccount/>
  },
  {
    path:"/intro",
    element: <Intro/>
  },

]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, 
    BlinkMacSystemFont, 'Segoe UI', 
    Roboto, Oxygen, Ubuntu, Cantarell, 
    'Open Sans', 'Helvetica Neue', sans-serif;
`;

function App() {



  return(
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App