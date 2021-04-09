import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from "react-native";
import { DEFAULT_THEME } from "../styles/theme";

export const borderBottomWidth = 2 / PixelRatio.get();
export const heightDimensions = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  itemCountry: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
    height: DEFAULT_THEME.itemHeight,
  },
  itemCountryName: {
    width: "90%",
  },
});
