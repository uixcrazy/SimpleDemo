import { Country } from "../types";

export default async (id: string) => {
  const countriesRaw: Country[] | undefined  = await new Promise((resolve, reject) => {
    fetch(`https://restcountries.eu/rest/v2/lang/${id}`)
      .then((response) => response.json())
      .then((remoteData: any) => {
        resolve(remoteData);
      })
      .catch(reject);
  });
  if (!countriesRaw) {
    return [];
  }

  return countriesRaw.sort((country1: Country, country2: Country) =>
    (country1.name as string).localeCompare(country2.name as string));
};
