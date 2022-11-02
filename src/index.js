import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './get-refs';
import CountriesListMarkup from './templates/countries-list-markup.hbs';
import countryCardMarkup from './templates/country-card-markup.hbs';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const inputValue = e.target.value.trim();

  resetMarkup();

  if (!inputValue) {
    return;
  }

  fetchCountries(inputValue)
    .then(filteredCountriesByArrayLength)
    .catch(error => console.log(error));
}

function filteredCountriesByArrayLength(arrayCountries) {
  if (arrayCountries.length <= 10 && arrayCountries.length > 1) {
    renderCountriesList(arrayCountries);
  } else if (arrayCountries.length === 1) {
    renderCountryCard(arrayCountries);
  } else if (!arrayCountries.length) {
    onFetchError();
  } else {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function renderCountryCard(country) {
  const markup = country.map(countryCardMarkup).join('');

  refs.countryContainerEl.innerHTML = markup;
}

function renderCountriesList(country) {
  const markup = country.map(CountriesListMarkup).join('');

  refs.countriesList.innerHTML = markup;
}

function resetMarkup() {
  refs.countriesList.innerHTML = '';
  refs.countryContainerEl.innerHTML = '';
}

function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}
