import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { defaultStyles } from "../styles/defaultStyles";

const PictureScreen = () => {
    return (
        <>
            <View style={defaultStyles.header}></View>
            <View style={defaultStyles.body}></View>
        </>
    );
};

export default PictureScreen;
