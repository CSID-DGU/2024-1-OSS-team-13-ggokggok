import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: "GeekbleMalang2";
      font-style: normal;
      font-weight: 100;
      src: url("src/others/font/GeekbleMalang2TTF.ttf") format("truetype");
    }
    body {
        font-family: "GeekbleMalang2";
    }
`;

export default GlobalStyle;
