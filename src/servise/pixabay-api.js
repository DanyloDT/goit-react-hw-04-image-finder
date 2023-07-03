import axios from 'axios';

const API_KEY = '37105589-3d487ec0acc050f78cec264eb';

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

export const getGallery = async ({ page, perPage, query }) => {
  const data = await pixabayApi.get('', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: perPage,
    },
  });
  return data;
};
