import fetch from "isomorphic-fetch";
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: `${process.env.HASURA_GRAPHQL_URI}`,
  fetch,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${process.env.HASURA_GRAPHQL_WS_URI}`,
  })
);

const link = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
