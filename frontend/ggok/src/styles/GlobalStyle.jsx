import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'basicFont';
        src: url('/src/others/font/laundryRegular.woff2') format('woff2'),
             url('/src/others/font/laundryRegular.woff') format('woff'),
             url('/src/others/font/laundryRegular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    body {
        font-family: 'basicFont', Arial, sans-serif;
    }
`;

export default GlobalStyle;
