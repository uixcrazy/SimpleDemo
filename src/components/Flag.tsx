import React from "react";
import flagCountries from "../../data/countries.json";
import {
  Image,
  StyleSheet,
  PixelRatio,
  View,
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

export const Flag = ({ countryCode }: { countryCode: string }) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode={"contain"}
        style={styles.imageFlag}
        source={{ uri: flagCountries[countryCode].flag }}
      />
    </View>
  );
};
