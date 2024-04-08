import { createGlobalStyle } from 'styled-components';
import GeekbleMalang2OTF from '../font/GeekbleMalang2OTF.otf'
import GeekbleMalang2TTF from '../font/GeekbleMalang2TTF.ttf'

const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'GeekbleMalang2TTF';
    src: url(${GeekbleMalang2TTF}) format('truetype');
    font-style: normal;
}

export
`;