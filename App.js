import { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Application from 'expo-application';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();


// ios - 99244557435-fei5lr6791nm3v4344nq8jfu4k5i6rc8.apps.googleusercontent.com
// android - 99244557435-958254535vjr2pg7mf82djkeknsss8ih.apps.googleusercontent.com
// web - 99244557435-e9u84u7itt2mavgup05vk7fl6ocd2817.apps.googleusercontent.com

export default function App() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);


  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '99244557435-e9u84u7itt2mavgup05vk7fl6ocd2817.apps.googleusercontent.com',
    androidClientId: '99244557435-958254535vjr2pg7mf82djkeknsss8ih.apps.googleusercontent.com',
    iosClientId: '99244557435-fei5lr6791nm3v4344nq8jfu4k5i6rc8.apps.googleusercontent.com',
  });

  useEffect(() => {
    console.log({response});
    if (response?.type === "success") {
      // console.log('response.authentication.accessToken', response.authentication.accessToken);
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{Application.applicationId}</Text>
      {userInfo === null ? (
          <Button
              title="Sign in with Google"
              disabled={!request}
              onPress={() => promptAsync()}
          />
      ) : (
          <Text style={styles.text}>{userInfo.name}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
