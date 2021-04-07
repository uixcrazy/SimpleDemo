import { StatusBar } from "expo-status-bar";
import React, { ReactNode, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, FlatListProps } from "react-native";
import { Country, CountryCode, Region, Subregion } from "./src/types";
import { CountryList } from "./src/components/CountryList";
import { useContext } from "./src/CountryContext";

interface Props {
  allowFontScaling?: boolean;
  countryCode?: CountryCode;
  region?: Region;
  subregion?: Subregion;
  countryCodes?: CountryCode[];
  excludeCountries?: CountryCode[];
  preferredCountries?: CountryCode[];
  flatListProps?: FlatListProps<Country>;
  withFlag?: boolean;
  disableNativeModal?: boolean;
  visible?: boolean;
  onSelect(country: Country): void;
  onOpen?(): void;
  onClose?(): void;
}

export default function App(props: Props) {
  const { translation, getCountriesAsync } = useContext();

  const {
    allowFontScaling,
    countryCode,
    region,
    subregion,
    countryCodes,
    // filterProps,
    // modalProps,
    flatListProps,
    onSelect,
    onClose: handleClose,
    onOpen: handleOpen,
    excludeCountries,
    preferredCountries,
  } = props;

  const [state, setState] = useState<{ countries: Country[] }>({
    countries: [],
  });

  const onSelectClose = (country: Country) => {
    console.log(country);
  };

  const setCountries = (countries: Country[]) =>
    setState({ ...state, countries });

  useEffect(() => {
    getCountriesAsync(
      translation,
      region,
      subregion,
      countryCodes,
      excludeCountries,
      preferredCountries
    )
      .then(setCountries)
      .catch(console.warn);
  }, [translation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <StatusBar style="auto" />

      <CountryList
        {...{
          onSelect: onSelectClose,
          data: state.countries,
          letters: [],
          // withFlag,
          flatListProps,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
