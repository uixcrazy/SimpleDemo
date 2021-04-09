import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { SimpleStackParams } from "../types";

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  button: {
    margin: 24,
  },
});

export default function NotFoundScreen({
  route,
  navigation,
}: StackScreenProps<SimpleStackParams, "NotFound">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 Not Found ({route.name})</Text>
      <Button
        title="Go to home"
        onPress={() => navigation.navigate("Countries")}
      />
    </View>
  );
}
