import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { useFacebookAuth, useGoogleAuth } from '../../hooks';

WebBrowser.maybeCompleteAuthSession();

const Auth = ({ navigation }) => {
  const handleUserResponseCallback = (user) => {
    navigation.navigate('Home', { email: user.email });
  };

  const [googleRequest, handleOpenGoogleAuthModal] = useGoogleAuth({ handleUserResponseCallback });
  const [facebookRequest, handleOpenFacebookAuthModal] = useFacebookAuth({
    handleUserResponseCallback,
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button
        title="Sign in with Google"
        disabled={!googleRequest}
        onPress={handleOpenGoogleAuthModal}
      />
      <View style={styles.whitespace} />
      <Button
        disabled={!facebookRequest}
        title="Sign in with Facebook"
        onPress={handleOpenFacebookAuthModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whitespace: {
    height: 20,
  },
});

export default Auth;
