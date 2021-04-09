import React from "react";
import {
  View,
  Text,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Link, StackActions } from "@react-navigation/native";

import { SimpleStackParams } from "../types";
import styles from "./CountryDetailsScreen.styles.js";

import Flag from "../components/Flag";

export default function CountryDetailsScreen({ route }: StackScreenProps<SimpleStackParams, "CountryDetails">) {
  const { country } = route.params;

  return (
    <View style={styles.container}>
      <Flag
        countryCode={country.alpha2Code}
        stylesFlag={styles.flag}
      />
      <Text style={styles.title}>{country.name}</Text>
      <View style={styles.row}>
        <Text>alpha2Code</Text>
        <Text>{country.alpha2Code}</Text>
      </View>
      <View style={styles.row}>
        <Text>callingCodes</Text>
        <Text>{country.callingCodes.map((c: string) => `+${c}`).join(",")}</Text>
      </View>
      <View style={styles.row}>
        <Text>population</Text>
        <Text>{country.population}</Text>
      </View>
      <View style={styles.row}>
        <Text>languages</Text>
        <View>
          {country.languages.map((l: { name: string, "iso639_1": string }) => (
            <Link
              to={`/link-component/${l.iso639_1}`} key={l.name}
              action={StackActions.replace("Language", {
                id: l.iso639_1,
                name: l.name,
              })}
              style={styles.link}
            >
              {l.name}
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
}
