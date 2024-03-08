import { Outlet } from 'react-router-dom';
import NavComponent from './components/nav/Nav.Component';
import FooterComponent from './components/footer/Footer.Component';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { useDispatch } from 'react-redux';
import { saveUser } from './redux/user.slicer';
import LoaderComponent from './components/loader/Loader.Component';
import CookieNoticeComponent from './components/CookieNotice/CookieNotice.Component';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// axios.defaults.baseURL = 'http://localhost:5050/api';
axios.defaults.baseURL = 'https://zurea-shop-backend.onrender.com/api';

axios.interceptors.request.use((config) => {// TOKEN ************************************
  //console.log('Axios Interceptor--->', config);
  if (localStorage.hasOwnProperty('zu_token')) {
    config.headers.Authorization = localStorage.getItem('zu_token');
  }
  return config;
})

function App() {
  
  const dispatch = useDispatch();
  const [isFinish, setIsFinish] = useState(false);
  let userLocalStorageStr = useLocalStorage('zu_user')[0];

  useEffect(() => {
    if (userLocalStorageStr) {
      dispatch(saveUser(userLocalStorageStr));
    }
    setIsFinish(true);
  }, [dispatch, userLocalStorageStr]);

  return isFinish && (
    <>
      <ToastContainer />
      <LoaderComponent />
      <NavComponent />
      <Outlet />
      <CookieNoticeComponent />
      <FooterComponent />
    </>
  );
}

export default App;
