import PropTypes from 'prop-types';
import { GridLoader, SyncLoader } from 'react-spinners';

const Loader = ({ size = 50, type }) => {
  return (
    <div
      className={`flex justify-center items-center text-center !w-full ${
        !type && 'my-20'
      }`}
    >
      {!type ? (
        <GridLoader color="#36d7b7" size={size} />
      ) : (
        <SyncLoader color="#36d7b7" size={size} />
      )}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.any,
  type: PropTypes.any,
};

export default Loader;
