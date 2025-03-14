"use client";
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';

const httpLink = createHttpLink({
    uri: "https://indexer.dev.hyperindex.xyz/93d64af/v1/graphql",
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
    },
});

const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
    return <ApolloProvider client={client}> {children} </ApolloProvider>;
};

export default ApolloClientProvider;
