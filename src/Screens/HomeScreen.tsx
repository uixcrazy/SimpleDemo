import React, { useRef, memo, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
  PixelRatio,
  Dimensions,
} from "react-native";
import {
  StackScreenProps,
} from "@react-navigation/stack";
import { useContext } from "../CountryContext";
import { Country, SimpleStackParams } from "../types";
import { DEFAULT_THEME } from "../styles/theme";

import { Flag } from "../components/Flag";
import { CountryText } from "../components/CountryText";

const borderBottomWidth = 2 / PixelRatio.get();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  itemCountry: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  itemCountryName: {
    width: "90%",
  },
});

type CountryItemProps = {
  country: Country,
  onSelect(country: Country): void,
}

const { height } = Dimensions.get("window");

const CountryItem = (props: CountryItemProps) => {
  const { activeOpacity, itemHeight, flagSize } = DEFAULT_THEME;
  const { country, onSelect } = props;
  const extraContent: string[] = [];
  return (
    <TouchableOpacity
      key={country.cca2}
      testID={`country-selector-${country.cca2}`}
      onPress={() => onSelect(country)}
      {...{ activeOpacity }}
    >
      <View style={[styles.itemCountry, { height: itemHeight }]}>
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

export default function HomeScreen({
  // route,
  navigation,
}: StackScreenProps<SimpleStackParams, "Home">) {
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
    navigation.navigate("Countries");
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
        initialNumToRender={Math.round(height / (DEFAULT_THEME.itemHeight || 1))}
      />
    </View>
  );
}
