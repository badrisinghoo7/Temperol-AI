import { useContext } from 'react';
import { User } from '@auth0/auth0-spa-js';
import Auth0Context, { type Auth0ContextInterface } from './auth0-context';

const useAuth0 = <TUser extends User = User>(
  context = Auth0Context
): Auth0ContextInterface<TUser> =>
  useContext(context) as Auth0ContextInterface<TUser>;

export default useAuth0;
