import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fileUpload } from "../http/customAxios";
import { checkId, getUserById, getUserByKey, getUserByUserId, loginApi, logoutApi, postUser, putUsers } from "./usersApi";
const initialState = {
    users: [],
    myId: "",
    isLogin: false,
    me: {},
};

const CHECK_ID = "CHECK_ID";
const LOGIN_CHECK = "LOGIN_CHECK";
const LOGIN = "LOGIN";
const INSERT_USER = "INSERT_USER";
const SELECT_USER_BY_ID = "SELECT_USER_BY_ID";
const SELECT_USER_BY_USERID = "SELECT_USER_BY_USERID";
const LOGOUT = "LOGOUT";
const UPDATE_USERS = "UPDATE_USERS";
const SELECT_USER_BY_KEY = "SELECT_USER_BY_KEY";

export const getCheckId = createAsyncThunk(CHECK_ID, async (userId, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    return await checkId(users, userId);
});
export const loginCheck = createAsyncThunk(LOGIN_CHECK, async (payload, thunkAPI) => {
    const { users, myId } = thunkAPI.getState().users;
    if (myId) {
        const me = await getUserById(users, Number(myId));
        return me;
    } else if (myId === 0 || myId === "0") {
        const me = await getUserById(users, Number(myId));
        return me;
    }
    return;
});
export const login = createAsyncThunk(LOGIN, async (user, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const isLogin = await loginApi(users, user);
    if (isLogin.token) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("id", isLogin.user.id.toString());
        await AsyncStorage.setItem("token", isLogin.token);
    }

    return isLogin;
});
export const insertUser = createAsyncThunk(INSERT_USER, async (user, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    await postUser(users, user);
    // return newUser;
});
export const selectUserById = createAsyncThunk(SELECT_USER_BY_ID, async (id, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const newUser = await getUserById(users, id);
    return newUser;
});

export const selectUserByUserId = createAsyncThunk(SELECT_USER_BY_USERID, async (userId, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const newUser = await getUserByUserId(users, userId);
    return newUser;
});

export const logout = createAsyncThunk(LOGOUT, async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const isLogout = await logoutApi(myId);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("token");
    return isLogout;
});
export const updateUsers = createAsyncThunk(UPDATE_USERS, async (user, thunkAPI) => {
    const { myId, users } = thunkAPI.getState().users;
    const { file, img, name } = user;
    if (file) await fileUpload("post", "/upload", user.file);
    const removeFileUser = { ...user, file: "", img, name };
    await putUsers(users, removeFileUser, myId);
    return { removeFileUser };
});
export const selectUserByKey = createAsyncThunk(SELECT_USER_BY_KEY, async (key, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const reg = new RegExp(key, "g");
    const newUsers = await getUserByKey(users, reg);

    return newUsers.id;
});

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginCheck.fulfilled, (state, { payload }) => {
                if (payload) {
                    return { ...state, isLogin: true, me: payload };
                } else {
                    return { ...state, isLogin: false };
                }
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                if (payload.isLogin) {
                    //     localStorage.setItem("id", payload.user.id);
                    //     localStorage.setItem("token", payload.token);
                    return {
                        ...state,
                        isLogin: payload.isLogin, //
                        me: payload.user,
                        myId: payload.user.id,
                    };
                } else {
                    return { ...state, isLogin: false };
                }
            })
            // .addCase(insertUser.fulfilled, (state, { payload }) => {
            //     return { ...state, users: payload };
            // })
            .addCase(logout.fulfilled, (state, { payload }) => {
                // localStorage.removeItem("id");
                // localStorage.removeItem("token");
                return { ...state, isLogin: false, me: {}, myId: "" };
            })
            .addCase(updateUsers.fulfilled, (state, { payload }) => {
                // const { newUsers, user } = payload;
                // return {  me: { ...state.me, ...user }, users: newUsers };
                return { ...state, me: { ...state.me, ...payload.removeFileUser } };
            });
    },
});

export default usersSlice.reducer;
