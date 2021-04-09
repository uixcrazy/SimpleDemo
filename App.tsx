import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NotFound from "./src/Screens/NotFound";
import CountriesScreen from "./src/Screens/CountriesScreen";
import CountryDetailsScreen from "./src/Screens/CountryDetailsScreen";
import LanguageScreen from "./src/Screens/LanguageScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Countries">
        <Stack.Screen
          name="NotFound"
          component={NotFound}
          options={{ title: "Oops!" }}
        />
        <Stack.Screen
          name="Countries"
          component={CountriesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CountryDetails"
          component={CountryDetailsScreen}
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="Language"
          component={LanguageScreen}
          options={{
            title: "",
            // headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
