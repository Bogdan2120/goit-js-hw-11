import { fetchImages } from './fetchImage';
import { renderImage } from './renderImage';

refs = {
  formSearch: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

let items = [];

async function renderGallery(dataSerch) {
  items = await fetchImages(dataSerch);

  const list = items.hits.map(renderImage);

  refs.gallery.insertAdjacentHTML('beforeend', list.join(''));
  //   console.log(list.join(''));
}

function onSearchImage(e) {
  e.preventDefault();

  const {
    elements: { searchQuery },
  } = e.currentTarget;
  console.log(searchQuery.value);
  renderGallery(searchQuery.value.trim());
}

refs.formSearch.addEventListener('submit', onSearchImage);
