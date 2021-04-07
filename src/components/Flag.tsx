import React, { memo } from "react";
import { useAsync } from "react-async-hook";
import { CountryCode } from "../types";
import { useContext } from "../CountryContext";
import {
  Image,
  StyleSheet,
  PixelRatio,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    marginRight: 10,
  },
  imageFlag: {
    resizeMode: "contain",
    width: 50,
    height: 38,
    borderWidth: 1 / PixelRatio.get(),
    opacity: 0.8,
  },
});

type FlagType = {
  countryCode: CountryCode;
};

const ImageFlag = memo(({ countryCode }: FlagType) => {
  const { getImageFlagAsync } = useContext();
  const asyncResult = useAsync(getImageFlagAsync, [countryCode]);
  if (asyncResult.loading) {
    return <ActivityIndicator size={"small"} />;
  }
  return (
    <Image
      resizeMode={"contain"}
      style={[styles.imageFlag, { borderColor: "transparent" }]}
      source={{ uri: asyncResult.result }}
    />
  );
});

export const Flag = ({ countryCode }: FlagType) => (
  <View style={styles.container}>
    <ImageFlag {...{ countryCode }} />
  </View>
);
