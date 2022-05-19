import { View, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";
import { APIURL } from "../../config/config";
const Post = ({ posts }) => {
    return posts.loading ? (
        <ActivityIndicator />
    ) : (
        <View style={styles.postBox}>
            <FlatList
                data={posts.posts} //
                style={styles.postImg}
                renderItem={ImgItem}
                keyExtractor={(item) => item.id}
                numColumns={Math.ceil(posts.posts.length / 3)}
            />
        </View>
    );
};
export default Post;

const ImgItem = ({ item }) => {
    return <Image style={styles.postImg} source={{ uri: `${APIURL}${item.img}` }}></Image>;
};
const styles = StyleSheet.create({
    postBox: { flexDirection: "row" },
    postImg: { width: "33.3%", aspectRatio: 1 },
});
