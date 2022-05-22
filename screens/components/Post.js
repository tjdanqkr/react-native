import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { APIURL } from "../../config/config";
const Post = ({ posts }) => {
    const navigation = useNavigation();
    return posts.loading ? (
        <ActivityIndicator />
    ) : (
        <View style={styles.postBox}>
            <FlatList
                data={posts.posts} //
                renderItem={(item) => ImgItem(item, navigation)}
                keyExtractor={(item) => item.id}
                numColumns={3}
            />
        </View>
    );
};
export default Post;

const ImgItem = ({ item }, navigation) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("PostDetail", item)} style={styles.postImg}>
            <Image style={styles.itemImg} source={{ uri: `${APIURL}${item.img}` }} resizeMode={"stretch"}></Image>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    postBox: { flexDirection: "row" },
    postImg: { flex: 0.333 },
    itemImg: { width: "100%", aspectRatio: 1 },
});
