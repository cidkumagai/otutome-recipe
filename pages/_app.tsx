import '../styles/styles.scss';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </ApolloProvider>
    );
}
