import { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
import useInitialState from "../hooks/useInitialState";

const GlobaStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const initialState = useInitialState();
  return (
    <>
      <GlobaStyle />
      <AppContext.Provider value={initialState}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default MyApp;
