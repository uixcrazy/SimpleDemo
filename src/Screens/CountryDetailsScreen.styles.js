import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from "react-native";

export const borderBottomWidth = 2 / PixelRatio.get();
export const heightDimensions = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  flag: {
    width: 150,
    height: 100,
    marginVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  link: {
    marginVertical: 12,
    color: "blue",
    textDecorationLine: "underline",
  },
  countriesList: {
    flex: 1,
    alignItems: "flex-end",
  },
});
