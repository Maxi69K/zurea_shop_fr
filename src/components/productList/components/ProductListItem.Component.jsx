import React from 'react';
import {useNavigate} from 'react-router-dom';

const ProductListItemComponent = (props) => {

  const {item, isEditMode} = props;
  const navigate = useNavigate();

  const onRedirect = () => {
    if (isEditMode) {
      return navigate(`/product/${item._id}/edit`);
    }
    // TODO: add to cart
  }

  return (
    <div className="card text-center p-2 ">
      <img
        src={item.imgUrl || 'https://source.unsplash.com/hyGXlmNeK-I'}
        className="card-img-top img-thumbnail img-fluid w-75 m-auto "
        alt={item.title}
      />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.description}</p>
        <button className="btn btn-sm btn-outline-primary m-1">
          Category: {item.category}
        </button>
        <button className="btn btn-sm btn-outline-primary m-1">
          Rating: {item.rating}
        </button>
        <button className="btn btn-sm btn-outline-primary m-1 mb-0">
          Price: {item.price}
        </button>
        <button className="btn btn-sm btn-outline-primary m-1 mb-0" onClick={()=>onRedirect()}>
          {isEditMode ? 'Edit' : 'Add To Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductListItemComponent;