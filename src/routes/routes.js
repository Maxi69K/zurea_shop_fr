import React from 'react'
import App from '../App';
import ErrorPageComponent from '../pages/ErrorPage.Component';
import HomePageComponent from '../pages/HomePage.Component';
import LoginPageComponent from '../pages/LoginPage.Component';
import UserPageComponent from '../pages/UserPage.Component';
import ShopPageComponent from '../pages/ShopPage.Component';
import ContactPageComponent from '../pages/ContactPage.Component';
import ProductCreatePageComponent from '../pages/ProductCreatePage.Component';
import UserProductPageComponent from '../pages/UserProductPage.Component';
import AuthGuardComponent from '../utils/AuthGuard.Component';
import RegisterPageComponent from '../pages/RegisterPage.Component';
import ActivationAccountPageComponent from '../pages/ActivationAccountPage.Component';
import AdminPageComponent from '../pages/admin/AdminPage.Component';
import UsersPageComponent from '../pages/admin/UsersPage.Component';
import AdminGuardComponent from '../utils/AdminGuard.Component';
import SingleUserPageComponent from '../pages/admin/SingleUserPage.Component';
import CheckOutPageComponent from '../pages/CheckOutPage.Component';
import PaymentPageComponent from '../pages/PaymentPage.Component';
import OrderPageComponent from '../pages/OrderPage.Component';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPageComponent />,
    children: [
      {
        path: '/',
        element: <HomePageComponent />,
      },
      {
        path: 'contact',
        element: <ContactPageComponent />,
      },
      {
        path: 'login',
        element: <LoginPageComponent />,
      },
      {
        path: 'register',
        element: <RegisterPageComponent />,
      },
      {
        path: 'activate-account/:userId',
        element: <ActivationAccountPageComponent />,
      },
      {
        path: 'user/:id',
        element: (
          <AuthGuardComponent>
            <UserPageComponent />
          </AuthGuardComponent>
        ),
      },
      {
        path: 'shop',
        element: <ShopPageComponent />,
      },
      {
        path: 'shop/:searchParams',
        element: <ShopPageComponent />, // need for url params (is not required for the query params)
      },
      {
        path: '/product/create',
        element: (
          <AuthGuardComponent>
            <ProductCreatePageComponent />
          </AuthGuardComponent>
        ),
      },
      {
        path: '/product/:productId/edit',
        element: (
          <AuthGuardComponent>
            <ProductCreatePageComponent />
          </AuthGuardComponent>
        ),
      },
      {
        path: '/user/products',
        element: (
          <AuthGuardComponent>
            <UserProductPageComponent />
          </AuthGuardComponent>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: <AdminPageComponent />,
    children: [
      {
        path: '',
        element: (
          <AdminGuardComponent>
            <UsersPageComponent />
          </AdminGuardComponent>
        ),
      },
      {
        path: 'user/:id',
        element: (
          <AdminGuardComponent>
            <SingleUserPageComponent />
          </AdminGuardComponent>
        ),
      },
    ],
  },
  {
    path: '/cartshop', //<CartShopPageComponent />
    element: (
      <AdminGuardComponent>
        <CheckOutPageComponent />
      </AdminGuardComponent>
    ),
    children: [
      {
        path: 'cart-product',
        element: null, //<CartComponent />
      },
      {
        path: 'checkout', //<CheckoutComponent />
        element: (
          <AdminGuardComponent>
            <CheckOutPageComponent />
          </AdminGuardComponent>
        ),
      },
      {
        path: 'payment',
        element: <PaymentPageComponent />,
      }
    ],
  },
  {
    path: '/order',
    element: <OrderPageComponent />,
  },
  {
    path: '/productDetails/:id',
    element: null, //<ProductDetailComponent />
  },
];

export default routes;