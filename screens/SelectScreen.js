import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectOtherPost, selectPostsByKey } from "../store/posts";
import { selectUserByKey } from "../store/users";

import { defaultStyles } from "../styles/defaultStyles";
import Post from "./components/Post";

const SelectScreen = () => {
    const dispatch = useDispatch();
    const otherPosts = useSelector((state) => state.posts.otherPosts);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (searchKey) {
            onSubmitSearch();
        } else {
            dispatch(selectOtherPost());
        }
    }, [isFocused]);
    const [searchKey, setSearchKey] = useState("");
    const onSubmitSearch = async () => {
        // const findUserId = await dispatch(selectUserByKey(searchKey)).unwrap();
        await dispatch(selectPostsByKey({ searchKey }));
    };
    return (
        <>
            <View style={defaultStyles.header}>
                <TextInput style={styles.searchInput} onChangeText={setSearchKey} autoCapitalize="none"></TextInput>
                <Button title="찾기" onPress={onSubmitSearch}></Button>
            </View>
            <View style={defaultStyles.body}>
                <Post posts={otherPosts}></Post>
            </View>
        </>
    );
};
export default SelectScreen;
const styles = StyleSheet.create({
    searchInput: { borderColor: "black", borderWidth: 1, width: "50%" },
});
