import axios from 'axios';

const API_KEY = '7885732-ff20ed2008037251c38d0317e';
const URL_CONFIG =
  'per_page=40&image_type=photo&orientation=horizontal&safesearch=true';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class ApiPixabey {
  constructor() {
    this.dataSearch = '';
    this.page = 1;
  }
  async fetchImages() {
    const response = await axios.get(
      `/?key=${API_KEY}&q=${this.dataSearch}&page=${this.page}&${URL_CONFIG}`
    );

    const data = await response;
    return data.data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
