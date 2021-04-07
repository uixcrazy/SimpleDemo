import { StatusBar } from 'expo-status-bar';
import React, { ReactNode, useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatListProps } from 'react-native';
import { Country, CountryCode, FlagType, Region, Subregion } from './src/types'
import { CountryList } from './src/components/CountryList';
import { useContext } from './src/CountryContext'

interface Props {
  allowFontScaling?: boolean
  countryCode?: CountryCode
  region?: Region
  subregion?: Subregion
  countryCodes?: CountryCode[]
  excludeCountries?: CountryCode[]
  preferredCountries?: CountryCode[]
  // modalProps?: ModalProps
  // filterProps?: CountryFilterProps
  flatListProps?: FlatListProps<Country>
  withEmoji?: boolean
  withCountryNameButton?: boolean
  withCurrencyButton?: boolean
  withCallingCodeButton?: boolean
  withFlagButton?: boolean
  withCloseButton?: boolean
  withFilter?: boolean
  withAlphaFilter?: boolean
  withCallingCode?: boolean
  withCurrency?: boolean
  withFlag?: boolean
  withModal?: boolean
  disableNativeModal?: boolean
  visible?: boolean
  onSelect(country: Country): void
  onOpen?(): void
  onClose?(): void
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
    withEmoji,
    withFilter,
    withCloseButton,
    withCountryNameButton,
    withCallingCodeButton,
    withCurrencyButton,
    withAlphaFilter,
    withCallingCode,
    withCurrency,
    withFlag,
    withModal,
    disableNativeModal,
    withFlagButton,
    onClose: handleClose,
    onOpen: handleOpen,
    excludeCountries,
    preferredCountries,
  } = props;

  const [state, setState] = useState<{ countries: Country[] }>({
    countries: [],
  })

  const onSelectClose = (country: Country) => {
    console.log(country);
  }

  const setCountries = (countries: Country[]) =>
    setState({ ...state, countries })

  useEffect(() => {
    getCountriesAsync(
      withEmoji ? FlagType.EMOJI : FlagType.FLAT,
      translation,
      region,
      subregion,
      countryCodes,
      excludeCountries,
      preferredCountries,
      withAlphaFilter,
    )
      .then(setCountries)
      .catch(console.warn)
  }, [translation, withEmoji])

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <StatusBar style="auto" />

      <CountryList
          {...{
            onSelect: onSelectClose,
            data: state.countries,
            letters: [],
            // withAlphaFilter: withAlphaFilter && filter === '',
            // withCallingCode,
            // withCurrency,
            // withFlag,
            // withEmoji,
            // filter,
            // filterFocus,
            flatListProps,
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
