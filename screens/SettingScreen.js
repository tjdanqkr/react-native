import { useEffect } from "react";
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { APIURL } from "../config/config";
import { selectMyFollower, selectMyFollowing } from "../store/follows";
import { selectMyPost } from "../store/posts";
import { logout } from "../store/users";
import { defaultStyles } from "../styles/defaultStyles";
import Post from "./components/Post";

const SettingScreen = () => {
    const { name, img } = useSelector((state) => state.users.me);
    const myPosts = useSelector((state) => state.posts.myPosts);
    const follower = useSelector((state) => state.follows.myFollower);
    const following = useSelector((state) => state.follows.myFollowing);
    const dispatch = useDispatch();
    const getMyPost = () => {
        dispatch(selectMyPost());
    };
    const myFollower = () => {
        dispatch(selectMyFollower());
    };
    const myFollowing = () => {
        dispatch(selectMyFollowing());
    };
    const out = () => {
        dispatch(logout());
    };
    useEffect(() => {
        getMyPost();
        myFollower();
        myFollowing();
    }, []);
    return (
        <>
            <View style={defaultStyles.header}>
                <Text style={styles.titleText}>{name}</Text>
                <View style={styles.rowBox}>
                    <Button title="+" onPress={out}></Button>
                    <Button title="out" onPress={out}></Button>
                </View>
            </View>
            <View style={defaultStyles.body}>
                <View style={[styles.rowBox, styles.myBox]}>
                    <TouchableOpacity onPress={() => console.log("click")}>
                        <Image style={styles.myImg} source={{ uri: `${APIURL}${img}` }}></Image>
                    </TouchableOpacity>
                    <View style={styles.myTextBox}>
                        <Text>{myPosts.posts.length}</Text>
                        <Text>게시물</Text>
                    </View>
                    <View style={styles.myTextBox}>
                        <Text>{follower.follows.length}</Text>
                        <Text>팔로워</Text>
                    </View>
                    <View style={styles.myTextBox}>
                        <Text>{following.follows.length}</Text>
                        <Text>팔로잉</Text>
                    </View>
                </View>
                <Post posts={myPosts}></Post>
            </View>
        </>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    titleText: { fontSize: 30, fontWeight: "bold" },
    rowBox: { flexDirection: "row" },
    myBox: { justifyContent: "space-around", margin: 20 },
    myImg: { width: 80, height: 80, borderRadius: 40 },
    myTextBox: { justifyContent: "center", alignItems: "center" },
});
