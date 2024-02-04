import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserProducts } from '../services/user.service';
import ProductListItemComponent from '../components/productList/components/ProductListItem.Component';
import { toggleLoader } from '../redux/loader.slicer';

const UserProductPageComponent = () => {

    //const user = useSelector(store => store.userStore.user);
    const {user} = useSelector(store => store.userStore);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {

      dispatch(toggleLoader(true));

        //console.log('User--->', user);
        UserProducts(user._id)
            .then(res => {
                //console.log(res.data);
                setProducts(res.data);
                // setTimeout(() => {
                //   dispatch(toggleLoader(false));
                // },2000)
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                dispatch(toggleLoader(false));
              })
    }, []);

    const renderProducts = () => {
        return products.map((item) => <ProductListItemComponent key={item._id} item={item} isEditMode={true} />);
    }

  return (
    <div className="container">
      <h2 className="text-center m-3">
        User: {user.email} --- {user.firstName}
      </h2>
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 shop-page">
        {renderProducts()}
      </div>
    </div>
  );
}

export default UserProductPageComponent