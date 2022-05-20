import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostDetailScreen from "../screens/PostDetailScreen";
import { login } from "../store/users";
import AuthNavigateScreen from "./AuthNavigateScreen";
import BottomNavigateScreen from "./BottomNavigateScreen";

const NavigationIndex = () => {
    const isLogin = useSelector((state) => state.users.isLogin);
    const dispatch = useDispatch();
    const Stack = createStackNavigator();
    const reLoginAction = async () => {
        const user = await AsyncStorage.getItem("user");
        dispatch(login(JSON.parse(user)));
    };
    useEffect(() => {
        reLoginAction();
    }, []);
    return isLogin ? ( //
        <Stack.Navigator>
            <Stack.Screen
                name="home" //
                component={BottomNavigateScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name="PostDetail" //
                component={PostDetailScreen}
                options={{
                    headerTitle: "글쓰기", //
                    headerBackTitleVisible: false,
                }}
            ></Stack.Screen>
        </Stack.Navigator>
    ) : (
        <AuthNavigateScreen></AuthNavigateScreen>
    );
};
export default NavigationIndex;
