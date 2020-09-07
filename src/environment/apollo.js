import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { apiUrl } from './api';

export const client = new ApolloClient({
  uri: apiUrl,
  fetch,
});
