export type Country = {
  name: string,
  alpha2Code: string,
  languages: [],
  flag: string,
  callingCodes: [],
}

export type CountryItemProps = {
  country: Country,
  onSelect(country: Country): void,
}

export type SimpleStackParams = {
  // Article: { author: string } | undefined;
  // NewsFeed: { date: number };
  NotFound: undefined,
  Countries: undefined,
  CountryDetails: { id: string },
  Language: undefined,
};
