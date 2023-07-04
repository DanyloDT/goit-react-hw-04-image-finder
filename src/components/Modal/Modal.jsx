import { useEffect } from 'react';
import css from './Modal.module.css';

import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ imgBig, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleClickBackdrop}>
      <div className={css.Modal}>
        <img
          className={css.imgModal}
          src={imgBig.largeImageURL}
          alt={imgBig.tags}
        />
      </div>
    </div>,
    modalRoot
  );
};
