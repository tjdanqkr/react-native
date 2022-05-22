import { useIsFocused, useLinkTo } from "@react-navigation/native";
import { useEffect } from "react";
import { Text, View, Image, StyleSheet, Button, ActivityIndicator, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { APIURL } from "../config/config";
import { selectPostMain } from "../store/posts";
import { defaultStyles } from "../styles/defaultStyles";

const HomeScreen = () => {
    const linkto = useLinkTo();
    const mainPosts = useSelector((state) => state.posts.mainPosts);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const getPostMain = () => {
        dispatch(selectPostMain());
    };
    useEffect(() => {
        getPostMain();
    }, [isFocused]);
    return (
        <View style={defaultStyles.container}>
            <View style={defaultStyles.header}>
                <Image style={[styles.logo]} source={{ uri: "https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png" }}></Image>
                <Button title="+" onPress={() => linkto("/PostAdd")} />
            </View>
            <View style={[defaultStyles.body, styles.margin]}>
                {mainPosts.loading ? (
                    <ActivityIndicator></ActivityIndicator>
                ) : (
                    <FlatList
                        data={mainPosts.posts} //
                        renderItem={(item) => card(item)}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    margin: { margin: 10 },
    logo: { height: "100%", aspectRatio: 4, resizeMode: "stretch" },
    itemImg: { width: "100%", aspectRatio: 1, marginBottom: 10, marginTop: 10 },
    card: { borderColor: "rgba(219,219,219,1.0)", borderWidth: 1, marginTop: 10, marginBottom: 10 },
    rowHeader: { flexDirection: "row", alignContent: "stretch", alignItems: "center" },
    myImg: { width: 30, height: 30, borderRadius: 15 },
});

const card = ({ item }) => {
    return (
        <View style={styles.card}>
            <View style={styles.rowHeader}>
                <Image style={styles.myImg} source={{ uri: `${APIURL}${item.userImg}` }}></Image>
                <Text>{item.userName}</Text>
            </View>
            <Image style={styles.itemImg} source={{ uri: `${APIURL}${item.img}` }} resizeMode={"stretch"}></Image>
            <Text>{item.content}</Text>
        </View>
    );
};
