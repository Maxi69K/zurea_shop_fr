import React from 'react';
import loadingImg from '../../assets/img/loader.gif';
import { useSelector } from 'react-redux';

const LoaderComponent = () => {
  const { loader } = useSelector((store) => store.loaderStore);
  return (
    loader && (
      <div className="loader">
        <img src={loadingImg} alt="Loading" />
      </div>
    )
  );
};

export default LoaderComponent;
