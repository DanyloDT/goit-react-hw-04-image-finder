import { useEffect, useState } from 'react';
import { getGallery } from 'servise/pixabay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import css from './App.module.css';
import { Loader } from './Loader/Loader';

// const INITIAL_STATE = {
//   images: [],
//   query: '',
//   page: 1,
//   perPage: 12,
//   showBtn: false,
//   loading: false,
// };
export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await getGallery({ page, perPage, query });
        if (data.totalHits === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setImages(prev => [...prev, ...data.hits]);
        setShowBtn(page < Math.ceil(data.totalHits / perPage));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [page, query, perPage]);

  const onHandleLoadBtn = () => {
    setPage(prev => prev + 1);
  };

  const onSubmit = inputValue => {
    if (inputValue === '') {
      return alert('Please fill out the search field!');
    }
    if (inputValue === query && inputValue !== '') {
      return alert('The search query has not been changed.');
    }
    setQuery(inputValue);
    setPage(1);
    setImages([]);
    setShowBtn(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      {showBtn && <Button onHandleLoadBtn={onHandleLoadBtn} />}
    </div>
  );
};
