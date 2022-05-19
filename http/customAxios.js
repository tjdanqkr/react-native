import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
axios.defaults.baseURL = "http://127.0.0.1:8000";
const getToken = async () => {
    return await AsyncStorage.getItem("token");
};
export const customAxios = async (method, url, data) => {
    const token = await getToken();
    return await axios({
        method,
        url,
        data,
        headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
            Authorization: `Bearer ${token}`,
        },
    });
};

export const fileUpload = async (method, url, data) => {
    const token = await getToken();
    return await axios({
        method,
        url,
        data,
        headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
            // "Content-Type": "multipart/form-data; ",
            Authorization: `Bearer ${token}`,
        },
    });
};
