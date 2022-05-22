import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostAddScreen from "../screens/PostAddScreen";
import PostDetailScreen from "../screens/PostDetailScreen";
import UserUpdateScreen from "../screens/UserUpdateScreen";
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
                    headerTitle: "", //
                    headerBackTitleVisible: false,
                }}
            ></Stack.Screen>
            <Stack.Screen
                name="UserUpdate" //
                component={UserUpdateScreen}
                options={{
                    headerTitle: "내 정보", //
                    headerBackTitleVisible: false,
                }}
            ></Stack.Screen>
            <Stack.Screen
                name="PostAdd" //
                component={PostAddScreen}
                options={{
                    headerTitle: "글 쓰기", //
                    headerBackTitleVisible: false,
                }}
            ></Stack.Screen>
        </Stack.Navigator>
    ) : (
        <AuthNavigateScreen></AuthNavigateScreen>
    );
};
export default NavigationIndex;
