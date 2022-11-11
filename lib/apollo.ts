import {
    ApolloClient,
    ApolloClientOptions,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';

const apolloClientOptions: ApolloClientOptions<NormalizedCacheObject> = {
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
};

const apolloClient = new ApolloClient(apolloClientOptions);

export default apolloClient;
