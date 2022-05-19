import { Text, View, Image, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../store/users";
import { defaultStyles } from "../styles/defaultStyles";

const HomeScreen = () => {
    return (
        <View style={defaultStyles.container}>
            <View style={defaultStyles.header}>
                <Image style={[styles.logo]} source={{ uri: "https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png" }}></Image>

                <Button style={styles.button} title="+"></Button>
            </View>
            <View style={defaultStyles.body}>
                <Text>Home</Text>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    logo: { height: "100%", aspectRatio: 4, resizeMode: "stretch" },
    button: { height: "100%", aspectRatio: 1 },
});
