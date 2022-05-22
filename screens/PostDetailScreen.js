import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, FlatList, ActivityIndicator, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { APIURL } from "../config/config";
import { deleteFollow, insertFollowing, selectMyFollowingOne } from "../store/follows";
const PostDetailScreen = ({ route }) => {
    const { params } = route;
    const dispatch = useDispatch();
    const { id } = useSelector((state) => state.users.me);
    const [isMyFollowing, setIsMyFollowing] = useState(false);
    const postFollowData = () => {
        dispatch(selectMyFollowingOne(params.userId))
            .unwrap()
            .then((res) => {
                setIsMyFollowing(res);
            });
    };
    useEffect(() => {
        postFollowData();
    }, [params]);
    const unFollow = async () => {
        await dispatch(deleteFollow(params.userId));
        await postFollowData();
    };
    const follow = async () => {
        await dispatch(insertFollowing(params.userId));
        await postFollowData();
    };
    return (
        <View>
            <View style={styles.rowBox}>
                <View style={[styles.userInfo, styles.rowBox]}>
                    <Image style={styles.userImg} source={{ uri: `${APIURL}${params.userImg}` }}></Image>
                    <Text>{params.userName}</Text>
                </View>
                {params.userId === id ? (
                    <Text></Text> //
                ) : !isMyFollowing ? (
                    <Button title={"follow"} onPress={follow} />
                ) : (
                    <Button title={"unfollow"} onPress={unFollow} />
                )}
            </View>
            <View>
                <Image style={styles.postImg} source={{ uri: `${APIURL}${params.img}` }}></Image>
            </View>
        </View>
    );
};
export default PostDetailScreen;
const styles = StyleSheet.create({
    rowBox: { flexDirection: "row", justifyContent: "space-between" },
    userInfo: { margin: 10, alignItems: "center" },
    userImg: { width: 40, aspectRatio: 1, borderRadius: 20 },
    postImg: { width: "100%", aspectRatio: 1 },
});
