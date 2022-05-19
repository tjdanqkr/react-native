import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
    container: { flex: 1 },
    header: { flex: 1, flexDirection: "row", justifyContent: "space-between", alignContent: "stretch", borderBottomWidth: 1, borderBottomColor: "rgba(219,219,219,1.0)", padding: 10 },
    body: { flex: 10 },
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputBox: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "50%",
        marginBottom: 10,
    },
});
