import { createGlobalStyle } from 'styled-components';
import reset from "styled-reset";



const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
    font-family: "laundryR";
      font-style: normal;
      font-weight: 100;
      src: url("src/others/font/laundryRegular.ttf") format("truetype");
    }
    body {
        font-family: "laundryR";
    }
`;

export default GlobalStyle;