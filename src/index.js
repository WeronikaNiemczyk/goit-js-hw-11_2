import { fetchImages } from './partials/fetchImages';
import { renderImages } from './renderImages';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form');
export const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

gallery.innerHTML = '';
let page = 1;
const perPage = 40;

const searchingInput = async event => {
  // loadMoreBtn.style.visibility = 'hidden';
  event.preventDefault();
  const querySearch = event.target.elements.searchQuery.value.trim();
  try {
    if (!querySearch) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    fetchImages(querySearch, page, perPage).then(images => {
      if (querySearch === '' || images.length <= 0) {
        gallery.innerHTML = '';
        page = 1;
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        const imagesMarkup = renderImages(images);
        gallery.innerHTML = imagesMarkup;
        event.target.elements.searchQuery.value = '';
      }

      searchForm.reset();
      page = 1;
    });
  } catch {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

searchForm.addEventListener('submit', searchingInput);
//////////////////////////////////

// const searchForm = document.querySelector('#search-form');
// const gallery = document.querySelector('.gallery');
// // let querySearch = '';
// let startQuerySearch = '';
// let page = 1;
// let perPage = 40;

// const searchingInput = async event => {
//   event.preventDefault();
//   gallery.innerHTML = '';
//   const querySearch = event.target.elements.searchQuery.value.trim();
//   console.log('query: ', querySearch);
//   const images = await fetchImages(querySearch, page, perPage);
//   if (querySearch !== startQuerySearch) {
//     page = 1;
//     startQuerySearch = querySearch;
//   }

//   if (querySearch === '' || images.length === 0) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   } else {
//     const imagesMarkup = renderImages(images);
//     gallery.insertAdjacentHTML('beforeend', imagesMarkup);
//     // gallery.innerHTML = imagesMarkup;
//   }
// };

// searchForm.addEventListener('submit', searchingInput);
