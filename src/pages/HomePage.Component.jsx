import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllUser } from '../services/auth.service';
import TopTwoProductsComponent from '../components/topTwoProducts/TopTwoProducts.Component';
import ModalComponents from '../components/modal/Modal.Components';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../redux/modal.slicer';

const HomePageComponent = () => {

  const [users, setUsers] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {

    getAllUser().then((res) => {
      setUsers(res.data);
    });

    // setTimeout(() => {
    //   dispatch(toggleModal(true));
    // }, 5000);
  }, []);

  return (
    <>
      <h1 className="text-center m-3">Home Page</h1>
      <ul>
        {users.length > 0 &&
          users.map((user) => {
            return (
              <li key={user._id}>
                <Link to={`/user/${user._id}`}>
                  {user.username} - {user.email}
                </Link>
              </li>
            );
          })}
      </ul>
      <button
        onClick={() => dispatch(toggleModal(true))}
        className="btn btn-outline-primary d-block my-3 m-auto"
      >
        Modal
      </button>
      <h2 className="text-center m-3">Top two products</h2>
      <TopTwoProductsComponent />
      <ModalComponents>
        <div className="text-center text-info">
          <h2>This is a modal</h2>
          <button
            onClick={() => dispatch(toggleModal(false))}
            className="btn btn-sm btn-outline-light mt-3"
          >
            Accept
          </button>
        </div>
      </ModalComponents>
    </>
  );
}

export default HomePageComponent