import { Component } from 'react';
import css from './Modal.module.css';

import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { imgBig } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.handleClickBackdrop}>
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
  }
}
