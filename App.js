import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import NavigationContainerBottom from './components/NavigationContainerBottom';

const getItem = () => {
  const tmp = new Array(200);
  return tmp.map((data, i) => i);
};

const ItemView = (data) => {};
export default function App() {
  return <NavigationContainerBottom></NavigationContainerBottom>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    borderWidth: 1,
    width: 60,
    borderColor: 'red',
  },
  dataList: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
