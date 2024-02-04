import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { CreateProduct, GetProduct, UpdateProduct } from '../../services/product.service';
import { useParams } from 'react-router-dom';
import { toggleLoader } from '../../redux/loader.slicer';

const ProductCreateFormComponent = () => {
  const [imgString, setImgString] = useState('');
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
  });
  const [errorMsg, setErrorMsg] = useState('');
  const user = useSelector((store) => store.userStore.user);
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log('Product state-->', product);
  }, [product]);

  useEffect(() => {
    //console.log('img string--->', imgString);
    //console.log('User--->', user?._id);
    //console.log('ProductId--->', productId);

    productId && getEditProduct();
  }, [productId]);

  const getEditProduct = () => {
    dispatch(toggleLoader(true));

    GetProduct(productId)
      .then((response) => {
        //console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error.response.data);
      })
      .finally(() => {
        dispatch(toggleLoader(false));
      });
  };

  const formik = useFormik({
    initialValues: product,
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required(), // required('error message')
      description: Yup.string().required(),
      price: Yup.number().min(1, 'must be more then 0').required(),
    }),
    onSubmit: (values) => {
      dispatch(toggleLoader(true));
      //console.log('values---', values);
      // !user?._id ? null : onSubmitForm(values);
      if (!user?._id) {
        dispatch(toggleLoader(false));
        return null;
      }
      onSubmitForm(values);
    },
  });

  const onSubmitForm = (values) => {
    if (productId) {
      onUpdateProduct(values);
    } else {
      onCreateProduct(values);
    }
  };

  const onUpdateProduct = (values) => {
    console.log(values);
    UpdateProduct({
      ...values,
      imgUrl: imgString || values.imgUrl
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => dispatch(toggleLoader(false)));
  };

  const onCreateProduct = (values) => {
    CreateProduct({
      ...values,
      userId: user?._id,
      imgUrl: imgString,
    })
      .then((response) => {
        console.log(response);
        // TODO: add msg and redirect
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => dispatch(toggleLoader(false)));
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      // Native DOM class
      const fileReader = new FileReader();
      // Convert file to Base64
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        //console.log(fileReader.result);
        setImgString(fileReader.result);
      };
      fileReader.onerror = () => {
        console.log(fileReader.error);
      };
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    //console.log(file);
    convertFileToBase64(file);
  };

  const renderForm = () => {
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title ? (
            <span className="text-danger">{formik.errors.title}</span>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <span className="text-danger">{formik.errors.description}</span>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price in $
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.touched.price && formik.errors.price ? (
            <span className="text-danger">{formik.errors.price}</span>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="image"
            name="image"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>

          <div className="mb-3 text-center">
            <img
              src={imgString || product.imgUrl || 'https://source.unsplash.com/hyGXlmNeK-I'}
              alt="Product Image"
              className="img-thumbnail img-fluid"
            />
          </div>

        <button className="btn btn-outline-primary form-control" type="submit">
          {productId ? 'Edit' : 'Add Product'}
        </button>
      </form>
    );
  };

  return (
    <div className="col-sm-8 col-lg-6 col-xl-4 mx-3 m-sm-auto ">
      <h6 className="text-danger">{errorMsg}</h6>
      {!productId ? renderForm() : product.title ? renderForm() : null}
    </div>
  );
};

export default ProductCreateFormComponent;
