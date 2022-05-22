import { StyleSheet, Text, View, TextInput, ScrollView, FlatList, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "./store/store";
import NavigationIndex from "./navigation/NavigationIndex";
export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <NavigationContainer>
                        <NavigationIndex></NavigationIndex>
                    </NavigationContainer>
                </SafeAreaView>
            </SafeAreaProvider>
        </Provider>
    );
}
