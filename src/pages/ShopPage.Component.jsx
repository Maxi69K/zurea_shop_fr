import React from 'react';
import ProductListComponent from '../components/productList/ProductList.Component';

const ShopPageComponent = () => {
  return (
    <>
      <h1 className="text-center m-3">Shop Page</h1>
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 shop-page">
        <ProductListComponent />
      </div>
    </>
  );
};

export default ShopPageComponent;
