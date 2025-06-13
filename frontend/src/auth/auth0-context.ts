import { createContext } from 'react';
import { type Auth0ContextInterface, User } from '@auth0/auth0-react';

const Auth0Context = createContext<Auth0ContextInterface<User> | undefined>(undefined);

export default Auth0Context;
export type { Auth0ContextInterface };
