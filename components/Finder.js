import { Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Finder() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Finder</Text>
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
