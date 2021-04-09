import { Country } from "../types";

export const loadDataAsync = ((data?: Country[]) => (): Promise<Country[] | undefined> => {
  return new Promise((resolve, reject) => {
    if (!data) {
      fetch("https://restcountries.eu/rest/v2/all")
        .then((response) => response.json())
        .then((remoteData: any) => {
          resolve(remoteData);
        })
        .catch(reject);
    } else {
      resolve(data);
    }
  });
})();

export default async () => {
  const countriesRaw = await loadDataAsync();
  if (!countriesRaw) {
    return [];
  }

  return countriesRaw.sort((country1: Country, country2: Country) =>
    (country1.name as string).localeCompare(country2.name as string));
};
