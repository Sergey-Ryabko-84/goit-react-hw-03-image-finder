import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from './Button/Button';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from '../api'
import { AppWrapper } from './App.styled';
import {smoothlyScroll} from './smoothlyScroll'

export class App extends Component {
  state = {
    query: '',
    images: null,
    page: 1,
    totalHits: 0,
    loading: false,
  };


  async componentDidUpdate(_, prevState) {
    const {query, page} = this.state;
    if (
      prevState.query !== query ||
      prevState.page !== page
    ) {
      this.setState({ loading: true });
      try {
        const response = await fetchImages(query, page);
        console.log(response);
        if (this.state.images) this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
        }));
        else this.setState({
          images: response.hits,
          totalHits: response.totalHits,
        });
      } catch {
      } finally {
        this.setState({ loading: false });
      }
    }
    if (page > 1) smoothlyScroll();
  }

  handleFormSubmit = query => {
    this.setState({
      query,
      images: null,
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, totalHits } = this.state;
    images && images.length === totalHits && toast('All images uploaded!');
    return (
      <AppWrapper>
        <GlobalStyle />
        <Toaster position="top-right" />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images && <ImageGallery images={images} />}
        {loading && <Loader />}
        {images && (images.length !== totalHits) && <Button onLoadMore={this.handleLoadMore} />}
      </AppWrapper>
    );
  }
}
