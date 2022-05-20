import { Link, useLinkBuilder, useLinkProps, useLinkTo, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { APIURL } from "../../config/config";
import PostDetailScreen from "../PostDetailScreen";
const Post = ({ posts }) => {
    return posts.loading ? (
        <ActivityIndicator />
    ) : (
        <View style={styles.postBox}>
            <FlatList
                data={posts.posts} //
                style={styles.postImg}
                renderItem={(item) => ImgItem(item)}
                keyExtractor={(item) => item.id}
                numColumns={3}
            />
        </View>
    );
};
export default Post;

const ImgItem = ({ item }) => {
    return (
        <Link to={{ screen: "PostDetail", params: item }} style={styles.postImg}>
            <Image style={{ width: "100%", aspectRatio: 1 }} source={{ uri: `${APIURL}${item.img}` }}></Image>
        </Link>
    );
};
const styles = StyleSheet.create({
    postBox: { flexDirection: "row" },
    postImg: { width: "33%", aspectRatio: 1 },
});
