export function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url).then(res => {
    if (!res.ok || res.status === 404) {
      throw Error(onError);
    }
    return res.json();
  });
}
