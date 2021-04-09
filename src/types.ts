export type Country = {
  name: string,
  alpha2Code: string,
  languages: [],
  flag: string,
  callingCodes: string[],
}

export type CountryItemProps = {
  country: Country,
  onSelect(country: Country): void,
}

export type SimpleStackParams = {
  NotFound: undefined,
  Countries: undefined,
  CountryDetails: { country: any },
  Language: { id: string, name: string },
};
