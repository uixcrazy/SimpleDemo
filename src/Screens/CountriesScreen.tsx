import React, { useRef, memo, useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useContext } from "../CountryContext";
import { Country, CountryItemProps, SimpleStackParams } from "../types";
import { DEFAULT_THEME } from "../styles/theme";
import styles, { borderBottomWidth, heightDimensions } from "./CountriesScreen.styles";

import { Flag } from "../components/Flag";
import { CountryText } from "../components/CountryText";

const CountryItem = (props: CountryItemProps) => {
  const { activeOpacity, flagSize } = DEFAULT_THEME;
  const { country, onSelect } = props;
  const extraContent: string[] = [];
  return (
    <TouchableOpacity
      key={country.cca2}
      testID={`country-selector-${country.cca2}`}
      onPress={() => onSelect(country)}
      {...{ activeOpacity }}
    >
      <View style={styles.itemCountry}>
        <Flag {...{ countryCode: country.cca2, flagSize: flagSize! }} />
        <View style={styles.itemCountryName}>
          <CountryText numberOfLines={2} ellipsizeMode="tail">
            {country.name}
            {extraContent.length > 0 && ` (${extraContent.join(", ")})`}
          </CountryText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MemoCountryItem = memo<CountryItemProps>(CountryItem);

const renderItem = (props: Omit<CountryItemProps, "country">) => ({
  item: country,
}: ListRenderItemInfo<Country>) => (
  <MemoCountryItem {...{ country, ...props }} />
);

export default function CountriesScreen({ navigation }: StackScreenProps<SimpleStackParams, "Countries">) {
  const { translation, getCountriesAsync } = useContext();
  const flatListRef = useRef<FlatList<Country>>(null);

  const [state, setState] = useState<{ countries: Country[] }>({
    countries: [],
  });

  const setCountries = (countries: Country[]) =>
    setState({ ...state, countries });

  useEffect(() => {
    getCountriesAsync(
      translation,
    )
      .then(setCountries)
      .catch(console.warn);
  }, [translation]);


  const onSelect = (country: Country) => {
    navigation.navigate("CountryDetails");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.countries}
        renderItem={renderItem({
          onSelect,
        })}
        ref={flatListRef}
        testID="list-countries"
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={1}
        getItemLayout={(_data: any, index) => ({
          length: DEFAULT_THEME.itemHeight! + borderBottomWidth,
          offset: (DEFAULT_THEME.itemHeight! + borderBottomWidth) * index,
          index,
        })}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={Math.round(heightDimensions / (DEFAULT_THEME.itemHeight || 1))}
      />
    </View>
  );
}
