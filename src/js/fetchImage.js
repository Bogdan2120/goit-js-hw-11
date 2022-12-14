const URL = 'https://pixabay.com/api/';

export async function fetchImages(dataSearch) {
  const response = await fetch(
    `${URL}?key=7885732-ff20ed2008037251c38d0317e&q=${dataSearch}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  return await response.json();
}
