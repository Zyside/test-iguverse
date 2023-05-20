import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID, GOOGLE_CLIENT_ID } from '@env';

export const useGoogleAuth = ({ handleUserResponseCallback }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
  });
  useEffect(() => {
    if (response?.type === 'success') {
      getGoogleUser(response.authentication.accessToken);
    }
  }, [response]);
  const getGoogleUser = async (token) => {
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
      handleUserResponseCallback ? handleUserResponseCallback(user) : undefined;
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  const openGoogleAuthModal = () => {
    promptAsync();
  };

  return [request, openGoogleAuthModal];
};
