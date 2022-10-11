import fetch from "isomorphic-fetch"
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"

const httpLink = new HttpLink({
  uri: `${process.env.HASURA_GRAPHQL_URI}`,
  fetch,
})

const wsLink = process.browser
  ? new WebSocketLink({
      uri: `${process.env.HASURA_GRAPHQL_WS_URI}`,
      options: {
        reconnect: true,
      },
    })
  : null

const link = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        )
      },
      wsLink,
      httpLink
    )
  : httpLink

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
