import { useState } from "react";
import { View, StyleSheet, Image, Text, FlatList, ActivityIndicator, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { APIURL } from "../config/config";
const PostDetailScreen = ({ route }) => {
    const { params } = route;
    const { id } = useSelector((state) => state.users.me);

    return (
        <View>
            <View style={styles.rowBox}>
                <View style={[styles.userInfo, styles.rowBox]}>
                    <Image style={styles.userImg} source={{ uri: `${APIURL}${params.userImg}` }}></Image>
                    <Text>{params.userName}</Text>
                </View>
                {params.userId === id ? (
                    <Text></Text> //
                ) : params.follow ? (
                    <Button title={"follow"} />
                ) : (
                    <Button title={"unfollow"} />
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
