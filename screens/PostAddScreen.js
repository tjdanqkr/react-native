import { View, StyleSheet, Button, Image, TouchableOpacity, TextInput, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { useLayoutEffect, useState } from "react";
import { defaultStyles } from "../styles/defaultStyles";
import { APIURL } from "../config/config";
import { insertPosts } from "../store/posts";
const PostAddScreen = ({ navigation }) => {
    const [img, setImg] = useState("");
    const [content, setContent] = useState("");
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
    const onSubmitHandler = async () => {
        const post = { content, img, file };
        try {
            dispatch(insertPosts(post));
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button onPress={() => onSubmitHandler()} title="Create" />,
        });
    }, [navigation, content, img, file]);
    return (
        <View style={defaultStyles.form}>
            <TouchableOpacity //
                onPress={openImagePickerAsync}
                style={styles.imgBox}
            >
                {img ? (
                    <Image //
                        style={styles.img}
                        source={{ uri: `${imgUri ? imgUri : `${APIURL}${img}`}` }}
                    ></Image>
                ) : (
                    <Text>이미지를 선택해 주세요</Text>
                )}
            </TouchableOpacity>
            <TextInput
                style={defaultStyles.inputBox} //
                onChangeText={setContent}
                placeholder="content"
                autoCapitalize="none"
                value={content}
                multiline
                numberOfLines={4}
            />
        </View>
    );
};
export default PostAddScreen;
const styles = StyleSheet.create({
    img: { width: 300, height: 300 },
    imgBox: { margin: 30 },
});
