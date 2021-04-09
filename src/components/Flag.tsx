import React from "react";
import flagCountries from "../../data/countries.json";
import {
  View,
  Image,
  StyleProp,
  ImageStyle,
  StyleSheet,
  PixelRatio,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    paddingVertical: 10,
  },
  imageFlag: {
    resizeMode: "contain",
    width: 50,
    height: 38,
    borderWidth: 1 / PixelRatio.get(),
    opacity: 0.8,
    borderColor: "transparent",
  },
});

type Props = {
  countryCode: string,
  stylesFlag?: StyleProp<ImageStyle>,
}

export default ({ countryCode, stylesFlag }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode={"contain"}
        style={[styles.imageFlag, stylesFlag]}
        source={{ uri: flagCountries[countryCode].flag }}
      />
    </View>
  );
};
