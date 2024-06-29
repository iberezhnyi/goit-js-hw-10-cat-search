const API_KEY =
  'live_3ou38QWr2Svg4jMIzqn1EavRnMPBxXLV2FbYxrVKQvjYgOIQdmtTjVm9y5ydF3Pe';

export function fetchBreeds() {
  return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`).then(
    resp => {
      if (!resp.ok) throw new Error(resp.statusText);

      return resp.json();
    }
  );
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(resp => {
    if (!resp.ok) throw new Error(resp.statusText);

    return resp.json();
  });
}
