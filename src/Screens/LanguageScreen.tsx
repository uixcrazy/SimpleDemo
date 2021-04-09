import React from "react";
import {
  View,
  Button,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SimpleStackParams } from "../types";

export default function LanguageScreen({
  // route,
  navigation,
}: StackScreenProps<SimpleStackParams, "Language">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
