/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// // You can delete this file if you're not using it
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { FilterProvider } from "./src/FilterContext";
import { NewTruckProvider } from "./src/NewTruckContext";
import { DistroProvider } from "./src/DistroContext";
import { SettingsProvider } from "./src/SettingsContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/components/apollo/client";

export const wrapRootElement = ({ element }) => {
  return (
    <FilterProvider>
      <NewTruckProvider>
        <SettingsProvider>
          <DistroProvider>
            <Auth0Provider
              domain={`${process.env.AUTH0_DOMAIN}`}
              clientId={`${process.env.AUTH0_CLIENTID}`}
              redirectUri={`${process.env.AUTH0_CALLBACK}`}
            >
              <ApolloProvider client={client}>{element}</ApolloProvider>
            </Auth0Provider>
          </DistroProvider>
        </SettingsProvider>
      </NewTruckProvider>
    </FilterProvider>
  );
};
