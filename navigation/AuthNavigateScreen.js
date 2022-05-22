import { createStackNavigator } from "@react-navigation/stack";
import JoinScreen from "../screens/JoinScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();
const AuthNavigateScreen = () => {
    return (
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
            <Stack.Screen name="join" component={JoinScreen}></Stack.Screen>
        </Stack.Navigator>
    );
};

export default AuthNavigateScreen;
