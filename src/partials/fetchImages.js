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
