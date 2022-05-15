import { Text, StyleSheet, SafeAreaView } from 'react-native';
export default function MyProfile() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>MyProfile</Text>
    </SafeAreaView>
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
