import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

const refs = {
  select: document.querySelector('.js-breed-select'),
  selectWrapper: document.querySelector('.js-select-wrapper'),
  catInfo: document.querySelector('.js-cat-info'),
  loader: document.querySelector('.js-loader'),
  error: document.querySelector('.js-error'),
};

const customSelect = new SlimSelect({
  select: refs.select,
  data: [],
});

function renderSelect(list) {
  return list.map(({ id, name }) => {
    return { value: id, text: name };
  });
}

function renderCatInfo({ url, breeds }) {
  return `<div class="cat-info__image-thumb"><img class="cat-info__image" src="${url}" alt="${breeds[0].name}" width="350" /></div>
  <div class="cat-info__detais">
    <div>
      <h2 class="cat-info__title">${breeds[0].name}</h2>
      <p class="cat-info__description">${breeds[0].description}</p>
    </div>
    <div class="cat-info__temperament">
      <h3 class="cat-info__temperament-title">Temperament</h3>
      <p class="cat-info__temperament-text">${breeds[0].temperament}</p>
    </div>
  </div>`;
}

function showToast() {
  iziToast.show({
    message: 'Oops! Something went wrong! Try reload the page!',
    close: false,
    closeOnClick: true,
    position: 'topRight',
    messageColor: '#fff',
    backgroundColor: '#d60808',
  });
}

fetchBreeds()
  .then(data => {
    refs.selectWrapper.classList.remove('hidden');
    customSelect.setData(renderSelect(data));
  })
  .catch(e => {
    console.log(e.message);
    showToast();
  })
  .finally(() => refs.loader.classList.add('hidden'));

refs.select.addEventListener('change', ({ target: { value: catId } }) => {
  refs.loader.classList.remove('hidden');
  refs.catInfo.innerHTML = '';
  fetchCatByBreed(catId)
    .then(data => {
      refs.catInfo.insertAdjacentHTML('beforeend', renderCatInfo(data));
    })
    .catch(e => {
      console.log(e.message);
      showToast();
    })
    .finally(() => refs.loader.classList.add('hidden'));
});
