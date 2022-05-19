import { Link, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TextInput, View, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../store/users";
import { defaultStyles } from "../styles/defaultStyles";

const LoginScreen = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const onSubmitLogin = async () => {
        const user = {
            userId,
            password,
        };
        const { isLogin } = await dispatch(login(user)).unwrap();
    };

    return (
        <View style={defaultStyles.form}>
            <TextInput
                style={defaultStyles.inputBox} //
                onChangeText={setUserId}
                placeholder="id"
                autoCapitalize="none"
            />
            <TextInput
                style={defaultStyles.inputBox} //
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholder="password"
                autoCapitalize="none"
            />
            <Button title={"login"} onPress={onSubmitLogin}></Button>
            <Link to={{ screen: "join" }}>join</Link>
        </View>
    );
};

export default LoginScreen;
