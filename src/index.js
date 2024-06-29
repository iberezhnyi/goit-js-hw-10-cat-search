import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './js/refs';
import { isHiddenToggle } from './js/helpers';

const { select, catInfo, loader, error: errorRef } = refs;

fetchBreeds()
  .then(data => {
    isHiddenToggle(loader, select);

    createSelectMarcup(data);
  })
  .catch(error => {
    console.log(error);
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    isHiddenToggle(loader, errorRef);
  });

function createSelectMarcup(data) {
  const marcup = data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');

  select.insertAdjacentHTML('beforeend', marcup);

  new SlimSelect({
    select: '.breed-select',
  });
}

// Select block

select.addEventListener('change', onSelect);

function onSelect(evt) {
  const catId = evt.target.value;

  catInfo.innerHTML = '';

  if (!errorRef.classList.contains('is-hidden')) isHiddenToggle(errorRef);

  isHiddenToggle(loader);

  fetchCatByBreed(catId)
    .then(createCatInfoMarcup)
    .catch(error => {
      console.log(error);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      isHiddenToggle(loader, errorRef);
    });
}

function createCatInfoMarcup(data) {
  const marcupCat = data.map(element =>
    element.breeds
      .map(
        ({ temperament, description, name }) => `
    <img src="${element.url}" alt="${name}" width="500">
    <div class="cat-info-thumb">
      <h2 class="cat-info-title">${name}</h2>
      <p>${description}</p>
      <div>
        <h3 class="cat-info-subtitle">Temperament:</h3>
        <p class="cat-info-text">${temperament}</p>
      </div>
    </div>`
      )
      .join('')
  );

  isHiddenToggle(loader);
  catInfo.insertAdjacentHTML('beforeend', marcupCat);
}
