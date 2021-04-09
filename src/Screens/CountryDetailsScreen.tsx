import React from "react";
import {
  View,
  Button,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { SimpleStackParams } from "../types";
import styles from "./CountryDetailsScreen.styles.js";

export default function CountryDetailsScreen({
  route,
  navigation,
}: StackScreenProps<SimpleStackParams, "CountryDetails">) {
  const { id } = route.params;

  console.log(id);
  return (
    <View style={styles.container}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
