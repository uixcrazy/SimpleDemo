import React, { useRef, memo, useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Header } from "react-native-elements";

import { Country, CountryItemProps, SimpleStackParams } from "../types";
import getCountriesAsync from "../service/countries";
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
      key={country.alpha2Code}
      testID={`country-selector-${country.alpha2Code}`}
      onPress={() => onSelect(country)}
      {...{ activeOpacity }}
    >
      <View style={styles.itemCountry}>
        <Flag {...{ countryCode: country.alpha2Code, flagSize: flagSize! }} />
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
  const flatListRef = useRef<FlatList<Country>>(null);

  const [state, setState] = useState<{ countries: Country[] }>({
    countries: [],
  });

  const setCountries = (countries: Country[]) =>
    setState({ ...state, countries });

  useEffect(() => {
    getCountriesAsync()
      .then(setCountries)
      .catch(console.warn);
  }, []);


  const onSelect = (country: Country) => {
    console.log(country);
    navigation.navigate("CountryDetails", { id: "df" });
  };

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#006c7f"
        backgroundImageStyle={{}}
        barStyle="light-content"
        centerComponent={{
          text: "LIST OF COUNTRIES",
          style: { color: "#fff", fontSize: 18 },
        }}
        containerStyle={{ width: "100%" }}
        placement="center"
        rightContainerStyle={{}}
        statusBarProps={{}}
      />
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
