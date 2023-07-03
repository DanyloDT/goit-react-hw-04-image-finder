import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggelModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };
  render() {
    const { image } = this.props;
    const { showModal } = this.state;
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            className={css.ImageGallery_Image}
            src={image.webformatURL}
            alt={image.tags}
            onClick={this.toggelModal}
          />
        </li>
        {showModal && <Modal imgBig={image} onClose={this.toggelModal} />}
      </>
    );
  }
}
