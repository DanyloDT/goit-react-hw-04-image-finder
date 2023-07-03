import css from './Button.module.css';
export const Button = ({ onHandleLoadBtn }) => {
  return (
    <button onClick={onHandleLoadBtn} className={css.button}>
      Load more
    </button>
  );
};
