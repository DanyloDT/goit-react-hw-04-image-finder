import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggelModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGallery_Image}
          src={image.webformatURL}
          alt={image.tags}
          onClick={toggelModal}
        />
      </li>
      {showModal && <Modal imgBig={image} onClose={toggelModal} />}
    </>
  );
};
