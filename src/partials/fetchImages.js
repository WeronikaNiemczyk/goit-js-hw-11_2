import axios from 'axios';

export const fetchImages = async (querySearch, page, perPage) => {
  const API_KEY = '34850794-1a63b0f1d33e83dba8f53aae2';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: querySearch,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  });

  const responsePhotos = await axios.get(
    `https://pixabay.com/api/?${searchParams}`
  );
  return responsePhotos.data.hits;
};
// fetchImages().then(responsePhotos => console.log(responsePhotos));

/////////////////////////////////////

// export const fetchImages = async () => {
//   const API_KEY = '34850794-1a63b0f1d33e83dba8f53aae2';
//   let queryString = '';
//   let querySearch = queryString.split(' ').join('+');
//   // let querySearch = ''.split(' ').join('+');
//   let page = 1;
//   let perPage = 40;

//   const searchParams = new URLSearchParams({
//     key: API_KEY,
//     q: querySearch,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page: page,
//     per_page: perPage,
//   });
//   try {
//     const responsePhotos = await axios.get(
//       `https://pixabay.com/api/?${searchParams}`
//     );
//     return responsePhotos.data.hits;
//   } catch {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }
// };
// // fetchImages().then(responsePhotos => console.log(responsePhotos));
