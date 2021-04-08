import React, { useRef, memo, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ListRenderItemInfo,
  PixelRatio,
  FlatListProps,
  Dimensions,
} from "react-native";
import { DEFAULT_THEME } from "../styles/theme";
import { Country, Omit } from "../types";
import { Flag } from "./Flag";
import { useContext } from "../CountryContext";
import { CountryText } from "./CountryText";

const borderBottomWidth = 2 / PixelRatio.get();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  letters: {
    marginRight: 10,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    height: 23,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  letterText: {
    textAlign: "center",
  },
  itemCountry: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  itemCountryName: {
    width: "90%",
  },
  list: {
    flex: 1,
  },
  sep: {
    borderBottomWidth,
    width: "100%",
  },
});

interface LetterProps {
  letter: string;
  scrollTo(letter: string): void;
}
const Letter = ({ letter, scrollTo }: LetterProps) => {
  const { fontSize, activeOpacity } = DEFAULT_THEME;

  return (
    <TouchableOpacity
      testID={`letter-${letter}`}
      key={letter}
      onPress={() => scrollTo(letter)}
      {...{ activeOpacity }}
    >
      <View style={styles.letter}>
        <CountryText style={[styles.letterText, { fontSize: fontSize! * 0.8 }]}>
          {letter}
        </CountryText>
      </View>
    </TouchableOpacity>
  );
};

interface CountryItemProps {
  country: Country;
  onSelect(country: Country): void;
}
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

interface CountryListProps {
  data: Country[];
  filter?: string;
  filterFocus?: boolean;
  withAlphaFilter?: boolean;
  flatListProps?: FlatListProps<Country>;
  onSelect(country: Country): void;
}

const keyExtractor = (item: Country) => item.cca2;

const ItemSeparatorComponent = () => {
  const { primaryColorVariant } = DEFAULT_THEME;
  return (
    <View style={[styles.sep, { borderBottomColor: primaryColorVariant }]} />
  );
};

const { height } = Dimensions.get("window");

export const CountryList = (props: CountryListProps) => {
  const {
    data,
    onSelect,
    filter,
    filterFocus,
  } = props;
  console.log(data);

  const flatListRef = useRef<FlatList<Country>>(null);
  const [letter, setLetter] = useState<string>("");
  const { itemHeight, backgroundColor } = DEFAULT_THEME;
  const indexLetter = data
    .map((country: Country) => (country.name as string).substr(0, 1))
    .join("");

  const scrollTo = (lletter: string, animated: boolean = true) => {
    const index = indexLetter.indexOf(lletter);
    setLetter(lletter);
    if (flatListRef.current) {
      flatListRef.current!.scrollToIndex({ animated, index });
    }
  };
  // const onScrollToIndexFailed = (_info: {
  //   index: number
  //   highestMeasuredFrameIndex: number
  //   averageItemLength: number
  // }) => {
  //   if (flatListRef.current) {
  //     flatListRef.current!.scrollToEnd();
  //     scrollTo(letter);
  //   }
  // };
  const { search, getLetters } = useContext();
  const letters = getLetters(data);
  // useEffect(() => {
  //   if (data && data.length > 0 && filterFocus && !filter) {
  //     scrollTo(letters[0], false);
  //   }
  // }, [filterFocus]);

  const initialNumToRender = Math.round(height / (itemHeight || 1));
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem({
          onSelect,
        })}
      />
      {/* <FlatList
        onScrollToIndexFailed
        ref={flatListRef}
        testID="list-countries"
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={1}
        getItemLayout={(_data: any, index) => ({
          length: itemHeight! + borderBottomWidth,
          offset: (itemHeight! + borderBottomWidth) * index,
          index,
        })}
        renderItem={renderItem({
          withCurrency,
          onSelect,
        })}
        {...{
          data: search(filter, data),
          keyExtractor,
          onScrollToIndexFailed,
          ItemSeparatorComponent,
          initialNumToRender,
        }}
      /> */}
      {/* <ScrollView
        contentContainerStyle={styles.letters}
        keyboardShouldPersistTaps="always"
      >
        {letters.map((lletter) => (
          <Letter key={lletter} {...{ letter: lletter, scrollTo }} />
        ))}
      </ScrollView> */}
    </View>
  );
};

CountryList.defaultProps = {
  filterFocus: undefined,
};
