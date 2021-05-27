//! Нахимичить стилей
//! Сделать Element.scrollIntoView()
//! Добавить функционал отображения большой версии изображения
//? Вместо кнопки Load more можно сделать бесконечную загрузку при скроле используя Intersection Observer

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

  refs.list.innerHTML = '';
  fetchArticles();
}

function fetchArticles() {
  refs.loadMore.disabled = true;

  setTimeout(() => {
    imagesList.fetchImages().then(images => {
      renderImages(images);
      refs.loadMore.disabled = false;
    });
  }, 200);
}

function renderImages(images) {
  refs.list.insertAdjacentHTML('beforeend', imagesTpl(images));
}
