/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import {SWRConfig} from 'swr';
import {ChakraProvider} from '@chakra-ui/react';
import customTheme from '../styles/custom-theme';

/**
 * Main wrapper for React app
 * @param {object} props
 * @return {JSX}
 */
const App = ({Component, pageProps}) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
