import { Rings } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Rings
      height="200"
      width="200"
      color="#3f51b5"
      radius="6"
      wrapperStyle={{
        margin: ' 0 auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      wrapperClass={'Loader'}
      visible={true}
      ariaLabel="rings-loading"
    />
  );
};
