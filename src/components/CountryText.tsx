import React, { ReactNode } from 'react'
import { TextProps, Text } from 'react-native'
import { DEFAULT_THEME } from '../styles/theme';

export const CountryText = (props: TextProps & { children: ReactNode }) => {
  const { fontFamily, fontSize, onBackgroundTextColor } = DEFAULT_THEME;
  return (
    <Text
      {...props}
      style={{ fontFamily, fontSize, color: onBackgroundTextColor }}
    />
  )
}
