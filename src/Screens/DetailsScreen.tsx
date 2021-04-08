import React from "react";
import {
  View,
  Button,
} from "react-native";
import {
  StackScreenProps,
} from "@react-navigation/stack";
import { SimpleStackParams } from "../types";


export default function DetailsScreen({
  // route,
  navigation,
}: StackScreenProps<SimpleStackParams, "Details">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
