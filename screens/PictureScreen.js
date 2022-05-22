import { Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { defaultStyles } from "../styles/defaultStyles";

const PictureScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <>
            <View style={defaultStyles.header}>
                <Text>글 쓰기</Text>
            </View>

            <View style={defaultStyles.body}>
                <View style={styles.container}>
                    <Camera style={styles.camera} type={type}>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    setType(type === CameraType.back ? CameraType.front : CameraType.back);
                                }}
                            >
                                <Text style={styles.text}> Flip </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            </View>
        </>
    );
};

export default PictureScreen;
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    paragraph: {
        margin: 24,
        marginTop: 0,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    logo: {
        height: 128,
        width: 128,
    },

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    camera: {
        width: 256,
        height: 256,
    },
    text: {
        fontSize: 30,
    },
});
