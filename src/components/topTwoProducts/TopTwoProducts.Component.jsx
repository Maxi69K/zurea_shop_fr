import React, { useEffect, useState } from 'react';
import { GetTopTwoProducts } from '../../services/product.service';
import { useDispatch } from 'react-redux';
import { toggleLoader } from '../../redux/loader.slicer';

const TopTwoProductsComponent = () => {

    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(toggleLoader(true));

        GetTopTwoProducts()
            .then((res) => {
                setProducts(res.data);
                dispatch(toggleLoader(false));
            })
    }, []);

    const renderProducts = () => {
        return products.map((product) => {
            return ( 
              <div key={product._id} className="col-md-6">
                <div className="card text-center p-2 ">
                  <img
                    src={product.imgUrl}
                    className="card-img-top img-thumbnail img-fluid w-75 m-auto "
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <button className="btn btn-sm btn-outline-primary m-1">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            );
        })
    }

  return (
    <div className="container">
      <div className="row">
        {products.length > 0 && renderProducts()}
      </div>
    </div>
  );
};

export default TopTwoProductsComponent;
