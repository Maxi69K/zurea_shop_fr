import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../services/auth.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string().required('first name is required'),
  lastName: Yup.string().required('last name is required'),
  password: Yup.string().required(),
  username: Yup.string().required(),
});

const RegisterComponent = () => {
    const navigate = useNavigate();

  return (
    <div className="container col-sm-10 col-md-8 col-lg-6 col-xl-4">
      <h1>Register</h1>
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          username: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          // same shape as initial values
          // console.log(values);
          registerUser(values)
            .then((response) => {
                toast.success('Successfully registered. Please check you mail box.')
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
                toast.error(error?.response.data);
            })
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="email"
              type="email"
              placeholder="email"
              className="form-control my-3"
            />
            <div className="text-danger">
              <ErrorMessage name="email" />
            </div>

            <Field
              name="firstName"
              type="text"
              placeholder="first name"
              className="form-control my-3"
            />
            <div className="text-danger">
              <ErrorMessage name="firstName" />
            </div>

            <Field
              name="lastName"
              type="text"
              placeholder="last name"
              className="form-control my-3"
            />
            <div className="text-danger">
              <ErrorMessage name="lastName" />
            </div>

            <Field
              name="username"
              type="text"
              placeholder="username"
              className="form-control my-3"
            />
            <div className="text-danger">
              <ErrorMessage name="username" />
            </div>

            <Field
              name="password"
              type="password"
              placeholder="password"
              className="form-control my-3"
            />
            <div className="text-danger">
              <ErrorMessage name="password" />
            </div>

            <button
              className="btn btn-outline-primary form-control my-3"
              type="submit"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterComponent;