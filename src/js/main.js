import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import ApiPixabey, { fetchImages } from './fetchImage';
import { renderImage } from './renderImage';
import LoadBtn from './loadButtone';

const refs = {
  formSearch: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadGallery: document.querySelector('[data-action="loadBtn"]'),
};

let items = [];

const loadBtn = new LoadBtn({
  selector: '[data-action="loadBtn"]',
  hidden: true,
});

const apiPixabey = new ApiPixabey();
const lightbox = new SimpleLightbox('.gallery a');

async function renderGallery() {
  try {
    items = await apiPixabey.fetchImages();

    if (items.hits.length === 0) {
      console.log('error');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      loadBtn.hide();
      return;
    }

    if (480 === refs.gallery.children.length) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadBtn.hide();
    }

    loadBtn.enable();
    const list = items.hits.map(renderImage);
    refs.gallery.insertAdjacentHTML('beforeend', list.join(''));
    lightbox.refresh();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Sorry, an error occurred. Please try again.');
  }
}

function onSearchImage(e) {
  e.preventDefault();

  const {
    elements: { searchQuery },
  } = e.currentTarget;

  apiPixabey.dataSearch = searchQuery.value.trim();
  loadBtn.show();
  loadBtn.disable();
  apiPixabey.resetPage();

  refs.gallery.innerHTML = '';

  renderGallery();
  refs.formSearch.reset();
}

function loadGalleryImg() {
  loadBtn.disable();
  apiPixabey.incrementPage();
  renderGallery();
}

refs.formSearch.addEventListener('submit', onSearchImage);
refs.loadGallery.addEventListener('click', loadGalleryImg);
