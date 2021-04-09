import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import getCountriesOfLangAsync from "../service/languages";
import { SimpleStackParams, Country } from "../types";
import styles from "./CountryDetailsScreen.styles.js";
import { DEFAULT_THEME } from "../styles/theme";

export default function LanguageScreen({
  route,
  navigation,
}: StackScreenProps<SimpleStackParams, "Language">) {
  const { id, name } = route.params;

  const [state, setState] = useState<{ countries: Country[] }>({
    countries: [],
  });

  const setCountries = (countries: Country[]) =>
    setState({ ...state, countries });

  useEffect(() => {
    getCountriesOfLangAsync(id)
      .then(setCountries)
      .catch(console.warn);
  }, []);


  const onSelect = (country: Country) => {
    navigation.navigate("CountryDetails", { country });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.row}>
        <Text>alpha2Code</Text>
        <Text>{id}</Text>
      </View>
      <View style={styles.row}>
        <Text>countries</Text>
        <View style={styles.countriesList}>
          {state.countries.map((country) => (
            <TouchableOpacity
              key={country.alpha2Code}
              testID={`country-selector-${country.alpha2Code}`}
              onPress={() => onSelect(country)}
              {...{ activeOpacity: DEFAULT_THEME.activeOpacity }}
            >
              <Text style={styles.link}>{country.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
