import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

    *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font-size: 62.5%;
    }

    body {
        min-width: 100vw;
        min-height: 100vh;
        font-size: 1.6rem;
        font-family: "Roboto", sans-serif;
        margin: 0;
        padding: 0;
        padding-left: 300px;

        
    }
`;

export default GlobalStyle;
