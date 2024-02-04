import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, setTokenToLocalStorage, setUserToLocalStorage } from '../../services/auth.service';
import { saveUser } from '../../redux/user.slicer';
import { toast } from 'react-toastify';
//import useLocalStorage from '../../hooks/useLocalStorage';

const LoginSectionComponent = () => {
  const [signInObj, setSignInObj] = useState({
    email: '',
    password: '',
  });
  const [validationMsg, setValidationMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  //const [loggedUser, setLoggedUser] = useLocalStorage('zureaUser'); // Set Local Storage from ../../hooks/useLocalStorage

  const navigate = useNavigate();
  // hook from redux
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(loggedUser);
  // }, []);

  const handleSignInObj = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    let copySignInObj = { ...signInObj };
    copySignInObj[inputName] = inputValue;
    setSignInObj(copySignInObj);
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    if (!signInObj.email || !signInObj.password) {
      return setValidationMsg(
        `The ${!signInObj.email ? 'email' : 'password'} field is required`
      );
    }

    // todo: call API
    //console.log(signInObj);
    loginUser(signInObj)
      .then((res) => {
        //console.log('response...', res);
        if (res.status === 215) {
          toast.error(res.data);
        } else {
          setUserToLocalStorage(res.data.user);
          setTokenToLocalStorage(res.data.token);
          //setLoggedUser(signInObj); // Set Local Storage from ../../hooks/useLocalStorage
          dispatch(saveUser(res.data.user));
          navigate(res.data.user.isAdmin ? '/dashboard' : '/');
        }
      })
      .catch((err) => {
        console.log('error...', err);
        if (err) {
          setErrMsg('Something went wrong. Please try again.');
        }
      })
      .finally(() => {
        //console.log('Anything')
      });
  };

  const showHidePassword = () => {
    const passwordType = document.querySelector('input[name="password"]');
    const btnShowHide = document.getElementById('button-addon2');
    if (passwordType.type === 'password') {
      passwordType.type = 'text';
      btnShowHide.innerHTML = 'Hide';
    } else {
      passwordType.type = 'password';
      btnShowHide.innerHTML = 'Show';
    }
  }

  return (
    <>
      <h1 className="page-title">Log in to your account</h1>
      <div className="form-wrapper">
        <div className="login-form">
          <form onSubmit={onLoginSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                maxLength="60"
                //required
                onChange={(e) => handleSignInObj(e)}
                //onBlur={(e) => handleSignInObj(e)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="input-group mb-3 pass">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                aria-label="Password"
                aria-describedby="button-addon2"
                onChange={(e) => handleSignInObj(e)}
                //onBlur={(e) => handleSignInObj(e)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={showHidePassword}
              >
                Show
              </button>
            </div>
            <button
              type="submit"
              className="form-control mt-3 btn btn-outline-primary"
              //onClick={onLoginSubmit} // If not in form tag
            >
              Sign in
            </button>
          </form>

          {validationMsg ? (
            <p className="text-danger my-2 text-center">{validationMsg}</p>
          ) : null}

          {errMsg ? (
            <p className="text-danger my-2 text-center">{errMsg}</p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default LoginSectionComponent;
