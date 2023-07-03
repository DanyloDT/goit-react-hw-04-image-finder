import { Component } from 'react';
import { getGallery } from 'servise/pixabay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import css from './App.module.css';
import { Loader } from './Loader/Loader';

const INITIAL_STATE = {
  images: [],
  query: '',
  page: 1,
  perPage: 12,
  showBtn: false,
  loading: false,
};
export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;

    if (page !== prevState.page || query !== prevState.query) {
      this.getData();
    }
  }
  getData = async () => {
    const { page, perPage, query } = this.state;
    this.setState({ loading: true });
    try {
      const { data } = await getGallery({ page, perPage, query });
      if (data.totalHits === 0) {
        alert(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        showBtn: page < Math.ceil(data.totalHits / perPage),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };
  onHandleLoadBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSubmit = inputValue => {
    if (inputValue === '') {
      return alert('Please fill out the search field!');
    }
    if (inputValue === this.state.query && inputValue !== '') {
      return alert('The search query has not been changed.');
    }
    this.setState({ ...INITIAL_STATE, query: inputValue });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.loading && <Loader />}
        {this.state.showBtn && (
          <Button onHandleLoadBtn={this.onHandleLoadBtn} />
        )}
      </div>
    );
  }
}
