import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NotFound from "./src/Screens/NotFound";
import CountriesScreen from "./src/Screens/CountriesScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import LanguageScreen from "./src/Screens/LanguageScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lime",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  header: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 18,
  },
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.header}>
        <Text style={styles.headerText}>LIST COUNTRIES</Text>
      </View>

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="NotFound"
          component={NotFound}
          options={{ title: "Oops!" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Countries"
          component={CountriesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Language"
          component={LanguageScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
