import { createGlobalStyle } from 'styled-components';
import GeekbleMalang2 from './font/GeekbleMalang2OTF.otf'

const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'GeekbleMalang2';
    src: local('GeekbleMalang2'), local('GeekbleMalang2');
    font-style: normal;
    src: url(${GeekbleMalang2}) format('truetype');
}
`;