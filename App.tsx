import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "react-native-elements";

import NotFound from "./src/Screens/NotFound";
import CountriesScreen from "./src/Screens/CountriesScreen";
import CountryDetailsScreen from "./src/Screens/CountryDetailsScreen";
import LanguageScreen from "./src/Screens/LanguageScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>LIST COUNTRIES</Text>
      </View> */}
      <Header
        backgroundColor="#006c7f"
        backgroundImageStyle={{}}
        barStyle="light-content"
        centerComponent={{
          text: "LIST COUNTRIES",
          style: { color: "#fff", fontSize: 18 },
        }}
        containerStyle={{ width: "100%" }}
        // leftContainerStyle={{}}
        // linearGradientProps={{}}
        placement="center"
        rightContainerStyle={{}}
        statusBarProps={{}}
      />

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//   },
//   header: {
//     width: "100%",
//     height: 80,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   headerText: {
//     fontSize: 18,
//   },
// });
