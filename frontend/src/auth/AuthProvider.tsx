import { ReactNode } from 'react';
import { Auth0Provider, type Auth0ProviderOptions } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const CustomAuth0Provider = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN!;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
  const redirectUri = window.location.origin;

  const onRedirectCallback = (appState?: any) => {
    navigate(appState?.returnTo || '/');
  };

  const config: Auth0ProviderOptions = {
    domain,
    clientId,
    authorizationParams: {
      redirect_uri: redirectUri,
    },
    onRedirectCallback,
  };

  return <Auth0Provider {...config}>{children}</Auth0Provider>;
};

export default CustomAuth0Provider;
