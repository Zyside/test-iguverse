import { StyleSheet, Text, View } from 'react-native';

const Home = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text>{route.params?.email || 'No email provided by user'}</Text>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
