import { useState } from "react";
import { TextInput, View, Button, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { defaultStyles } from "../styles/defaultStyles";
import * as ImagePicker from "expo-image-picker";
import { fileUpload } from "../http/customAxios";
import { useDispatch } from "react-redux";
import { insertUser, login } from "../store/users";
const JoinScreen = () => {
    const dispatch = useDispatch();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [imgUri, setImgUri] = useState(undefined);
    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        const localUri = pickerResult.uri;
        const filename = localUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        formData.append("file", { uri: localUri, name: filename, type });
        await fileUpload("post", "/upload", formData);
        setImg(filename);
        setImgUri(pickerResult.uri);
    };
    const onSubmitJoin = async () => {
        const user = { userId, password, img, name };
        await dispatch(insertUser(user));
        await dispatch(login(user));
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
            <TextInput
                style={defaultStyles.inputBox} //
                onChangeText={setName}
                placeholder="name"
                autoCapitalize="none"
            />
            {imgUri ? <Image style={styles.img} source={{ uri: imgUri }}></Image> : null}
            <TouchableOpacity onPress={openImagePickerAsync}>
                <Text>Pick a photo</Text>
            </TouchableOpacity>
            <Button title={"join"} onPress={onSubmitJoin}></Button>
        </View>
    );
};
const styles = StyleSheet.create({
    img: { width: 100, height: 100, borderRadius: 50 },
});
export default JoinScreen;
