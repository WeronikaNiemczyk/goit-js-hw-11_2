import { fetchImages } from './partials/fetchImages';
import { renderImages } from './partials/renderImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.style.visibility = 'hidden';
gallery.innerHTML = '';
let page = 1;
const perPage = 40;
let simpleLightBox;
let currentQuerySearch = '';

const searchingInput = async event => {
  event.preventDefault();
  const querySearch = event.target.elements.searchQuery.value.trim();
  currentQuerySearch = querySearch;
  try {
    if (!querySearch) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    await fetchImages(querySearch, page, perPage).then(images => {
      if (querySearch === '' || images.length <= 0) {
        gallery.innerHTML = '';
        page = 1;
        loadMoreBtn.style.visibility = 'hidden';
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        const imagesMarkup = renderImages(images);
        gallery.innerHTML = imagesMarkup;
        // event.target.elements.searchQuery.value = '';
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        if (images.length < 40) {
          loadMoreBtn.style.visibility = 'hidden';
        } else {
          loadMoreBtn.style.visibility = 'visible';
        }
      }
      searchForm.reset();
      // // page = 1;
    });
  } catch {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

const loadMore = async () => {
  page += 1;
  // const querySearch = searchForm.elements.searchQuery.value.trim();
  const querySearch = currentQuerySearch;
  if (querySearch !== currentQuerySearch) {
    page = 1;
    return Notiflix.Notify.warning(
      'Sorry, you cannot load more results for a different search query.'
    );
  }
  try {
    const totalHits = await fetchImages(querySearch, page, perPage);
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    if (totalHits <= perPage) {
      loadMoreBtn.style.visibility = 'hidden';
      return Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      const newPages = renderImages(totalHits);
      gallery.insertAdjacentHTML('beforeend', newPages);
    }
    // return totalHits;
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

searchForm.addEventListener('submit', searchingInput);
loadMoreBtn.addEventListener('click', loadMore);
