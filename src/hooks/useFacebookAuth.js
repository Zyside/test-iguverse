import * as Facebook from 'expo-auth-session/providers/facebook';
import { useEffect } from 'react';
import { FACEBOOK_CLIENT_ID } from '@env';

export const useFacebookAuth = ({ handleUserResponseCallback }) => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_CLIENT_ID,
  });

  useEffect(() => {
    if (response && response?.type === 'success' && response.authentication) {
      (async () => {
        const userResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,email,picture.type(large)`
        );
        const user = await userResponse.json();
        handleUserResponseCallback ? handleUserResponseCallback(user) : undefined;
      })();
    }
  }, [response]);

  const openFacebookAuthModal = async () => {
    const result = await promptAsync();
    if (result.type !== 'success') {
      console.error('Modal was closed or error accurate');
    }
  };

  return [request, openFacebookAuthModal];
};
