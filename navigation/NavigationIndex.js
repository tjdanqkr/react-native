import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/users";
import AuthNavigateScreen from "./AuthNavigateScreen";
import BottomNavigateScreen from "./BottomNavigateScreen";

const NavigationIndex = () => {
    const isLogin = useSelector((state) => state.users.isLogin);
    const dispatch = useDispatch();
    const reLoginAction = async () => {
        const user = await AsyncStorage.getItem("user");
        dispatch(login(JSON.parse(user)));
    };
    useEffect(() => {
        reLoginAction();
    }, []);
    return isLogin ? ( //
        <BottomNavigateScreen />
    ) : (
        <AuthNavigateScreen />
    );
};
export default NavigationIndex;
