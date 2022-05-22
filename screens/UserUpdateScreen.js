import { View, StyleSheet, Button, Image, TouchableOpacity, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { useLayoutEffect, useState } from "react";
import { defaultStyles } from "../styles/defaultStyles";
import { APIURL } from "../config/config";
import { updateUsers } from "../store/users";
const UserUpdateScreen = ({ navigation }) => {
    const me = useSelector((state) => state.users.me);
    const [img, setImg] = useState(me.img);
    const [name, setName] = useState(me.name);
    const [imgUri, setImgUri] = useState(undefined);
    const [file, setFile] = useState(undefined);
    const dispatch = useDispatch();
    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        const localUri = await pickerResult.uri;
        const filename = await localUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        formData.append("file", { uri: localUri, name: filename, type });
        // await fileUpload("post", "/upload", formData);
        setImg(`/${filename}`);
        setImgUri(pickerResult.uri);
        setFile(formData);
    };
    const onSubmitHandler = () => {
        const user = { name, img, file };
        try {
            dispatch(updateUsers(user));
            navigation.goBack();
        } catch (error) {}
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button onPress={() => onSubmitHandler(name, img, file)} title="Update" />,
        });
    }, [navigation, name, img, file]);
    return (
        <View style={defaultStyles.form}>
            <TouchableOpacity //
                onPress={openImagePickerAsync}
            >
                {img ? (
                    <Image //
                        style={styles.img}
                        source={{ uri: `${imgUri ? imgUri : `${APIURL}${img}`}` }}
                    ></Image>
                ) : null}
            </TouchableOpacity>
            <TextInput
                style={defaultStyles.inputBox} //
                onChangeText={setName}
                placeholder="name"
                autoCapitalize="none"
                value={name}
            />
        </View>
    );
};
export default UserUpdateScreen;
const styles = StyleSheet.create({
    img: { width: 100, height: 100, borderRadius: 50, margin: 30 },
});
