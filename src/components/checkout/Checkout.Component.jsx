import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { setCustomer } from '../../redux/cart.slicer';
import { useNavigate } from 'react-router-dom';

const CheckoutComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.userStore.user);

    const formik = useFormik({
      initialValues: {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        address: user?.address || '',
        city: user?.city || '',
        postCode: user?.postCode || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
      },
      enableReinitialize: true,
      validationSchema: Yup.object({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        address: Yup.string().required(),
        city: Yup.string().required(),
        pastCode: Yup.string().required(),
        email: Yup.string().email().required(),
        phoneNumber: Yup.string().required(),
      }),
      onSubmit: (values) => {
        console.log(values);
        dispatch(setCustomer(values));
        navigate('/cartshop/payment');
      },
    });

     const renderForm = () => {
       return (
         <div className="container col-sm-8 col-md-6 col-xl-4 mt-3">
           <form onSubmit={formik.handleSubmit}>
             <div className="mb-3">
               <label htmlFor="firstName" className="form-label">
                 First Name
               </label>
               <input
                 type="text"
                 className="form-control"
                 id="firstName"
                 name="firstName"
                 value={formik.values.firstName}
                 onChange={formik.handleChange}
               />
               {formik.touched.firstName && formik.errors.firstName ? (
                 <span className="text-danger">{formik.errors.firstName}</span>
               ) : null}
             </div>
             <div className="mb-3">
               <label htmlFor="lastName" className="form-label">
                 Last Name
               </label>
               <input
                 type="text"
                 className="form-control"
                 id="lastName"
                 name="lastName"
                 value={formik.values.lastName}
                 onChange={formik.handleChange}
               />
               {formik.touched.lastName && formik.errors.lastName ? (
                 <span className="text-danger">{formik.errors.lastName}</span>
               ) : null}
             </div>
             <div className="mb-3">
               <label htmlFor="address" className="form-label">
                 Address
               </label>
               <input
                 type="text"
                 className="form-control"
                 id="address"
                 name="address"
                 value={formik.values.address}
                 onChange={formik.handleChange}
               />
               {formik.touched.address && formik.errors.address ? (
                 <span className="text-danger">{formik.errors.address}</span>
               ) : null}
             </div>
             <div className="mb-3">
               <label htmlFor="city" className="form-label">
                 City
               </label>
               <input
                 type="text"
                 className="form-control"
                 id="city"
                 name="city"
                 value={formik.values.city}
                 onChange={formik.handleChange}
               />
               {formik.touched.city && formik.errors.city ? (
                 <span className="text-danger">{formik.errors.city}</span>
               ) : null}
             </div>
             <div className="mb-3">
               <label htmlFor="postCode" className="form-label">
                 Post Code
               </label>
               <input
                 type="number"
                 className="form-control"
                 id="postCode"
                 name="postCode"
                 value={formik.values.postCode}
                 onChange={formik.handleChange}
               />
               {formik.touched.postCode && formik.errors.postCode ? (
                 <span className="text-danger">{formik.errors.postCode}</span>
               ) : null}
             </div>
             <div className="mb-3">
               <label htmlFor="email" className="form-label">
                 Email
               </label>
               <input
                 type="email"
                 className="form-control"
                 id="email"
                 name="email"
                 value={formik.values.email}
                 onChange={formik.handleChange}
               />
               {formik.touched.email && formik.errors.email ? (
                 <span className="text-danger">{formik.errors.email}</span>
               ) : null}
             </div>
             <div className="mb-3">
               <label htmlFor="phoneNumber" className="form-label">
                 Phone Number
               </label>
               <input
                 type="text"
                 className="form-control"
                 id="phoneNumber"
                 name="phoneNumber"
                 value={formik.values.phoneNumber}
                 onChange={formik.handleChange}
               />
               {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                 <span className="text-danger">
                   {formik.errors.phoneNumber}
                 </span>
               ) : null}
             </div>

             <button
               className="btn btn-outline-primary form-control"
               type="submit"
             >
               Go to payment
             </button>
           </form>
         </div>
       );
     };

  return <>{renderForm()}</>;
}

export default CheckoutComponent