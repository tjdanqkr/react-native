import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import PictureScreen from "../screens/PictureScreen";
import SelectScreen from "../screens/SelectScreen";
import SettingScreen from "../screens/SettingScreen";
import PostDetailScreen from "../screens/PostDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const BottomNavigateScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "ios-information-circle" : "ios-information-circle-outline";
                    } else if (route.name === "Settings") {
                        iconName = "ios-list";
                    } else if (route.name === "Picture") {
                        iconName = "person";
                    } else if (route.name === "Select") {
                        iconName = "search-outline";
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Select" component={SelectScreen} />
            <Tab.Screen name="Picture" component={PictureScreen} />
            <Tab.Screen name="Settings" component={SettingScreen} />
        </Tab.Navigator>
    );
};
export default BottomNavigateScreen;
