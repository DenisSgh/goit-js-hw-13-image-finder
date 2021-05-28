import './css/styles.css';
import { refs } from './js/refs.js';
import Images from './js/imagesClass.js';
import { invalidRequest } from './js/notifications.js';

import imagesTpl from './templates/images.hbs';

const imagesList = new Images();

refs.form.addEventListener('submit', onClickButtonSubmit);
refs.loadMore.addEventListener('click', fetchArticles);

function onClickButtonSubmit(e) {
  e.preventDefault();

  imagesList.query = e.currentTarget.elements.query.value;

  if (imagesList.query === '') {
    return invalidRequest();
  }

  imagesList.resetPage();
  refs.list.innerHTML = '';
  fetchArticles();
}

function fetchArticles() {
  imagesList.fetchImages().then(images => {
    renderImages(images);
    refs.loadMore.style.display = 'inline-block';
  });
}

function renderImages(images) {
  refs.list.insertAdjacentHTML('beforeend', imagesTpl(images));
  refs.list.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
