import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoaderComponent from '../../components/loader/Loader.Component';

const AdminPageComponent = () => {
  return (
    <>
      <ToastContainer />
      <LoaderComponent />
      <div className="container-fluid p-0">
        <div className="row p-0 m-0">
          {/*Side bar*/}
          <div
            className="col-5 col-sm-3 col-xl-2 pl-0"
            style={{ paddingLeft: '0px', height: '100vh' }}
          >
            <div className="d-flex h-100">
              <div
                className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
                style={{ width: '100%' }}
              >
                <p className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <svg className="bi pe-none me-2" width="40" height="32">
                    <use></use>
                  </svg>
                  <span className="fs-4">Sidebar</span>
                </p>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                  <li className="nav-item">
                    <Link
                      to="users"
                      className="nav-link active"
                      aria-current="page"
                    >
                      <svg className="bi pe-none me-2" width="16" height="16">
                        <use></use>
                      </svg>
                      Users
                    </Link>
                  </li>
                </ul>
                <div className="dropdown">
                  <a
                    href="frontend/src#"
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://github.com/mdo.png"
                      alt="Picture"
                      width="32"
                      height="32"
                      className="rounded-circle me-2"
                    />
                    <strong>ADMIN</strong>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li>
                      <a href="frontend/src#" className="dropdown-item">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="frontend/src#" className="dropdown-item">
                        Profile
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <hr />
                    <li>
                      <a href="frontend/src#" className="dropdown-item">
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/*Side bar END*/}

          <div className="col-7 col-sm-9 col-xl-10 pl-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPageComponent;