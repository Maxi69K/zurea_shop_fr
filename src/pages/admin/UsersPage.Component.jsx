import { useEffect} from 'react';
import { getAllUsers } from '../../services/user.service';
import { useDispatch } from 'react-redux';
import { toggleLoader } from '../../redux/loader.slicer';
import { useQuery } from '@tanstack/react-query';//hook useQuery
import { useNavigate } from 'react-router-dom';

const UsersPageComponent = () => {
  // const [users, setUsers] = useState([]);
  // const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiGetUsersResponse = useQuery(['getAllUsers'], () => getAllUsers(), {
    enabled: false,
    onSuccess: (data) => {// then()
        //console.log(data);
    },
    onError: (error) => {//catch()
        //console.log(error);
    },
    onSettled: () => {//finally()
        
    }
  });

//   useEffect(() => {
//     console.log(apiGetUsersResponse);
//   }, [apiGetUsersResponse]);

//TODO: add pagination
  useEffect(() => {
    apiGetUsersResponse.refetch();
  }, []);

  useEffect(() => {
    dispatch(toggleLoader(apiGetUsersResponse.isLoading));
    apiGetUsersResponse.refetch();
  }, [apiGetUsersResponse.isLoading]);

  // useEffect(() => {
  //     dispatch(toggleLoader(true));
  //     getAllUsers()
  //         .then((response) => {
  //             console.log(response);
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         })
  //         .finally(() => {
  //             dispatch(toggleLoader(false));
  //         })
  // });

  const renderErrorMsg = () =>
    apiGetUsersResponse.isError ? (
      <p>{apiGetUsersResponse.error.message}</p>
    ) : null;

  const renderUsers = () => {
    if (apiGetUsersResponse.isSuccess && apiGetUsersResponse.data.data.length) {
      return apiGetUsersResponse.data.data.map((user, index) => {
        return (
          <tr role="button" key={index} onClick={e => navigate(`/dashboard/user/${user._id}`)}>
            <th scope="row">{index + 1}</th>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            {/* TODO: switch for changing isActive status */}
            <td>{user.isActive ? 'yes' : 'no'}</td>
          </tr>
        );
      });
    }
  };

  return (
    <>
      <h1 className="text-center m-3">Users</h1>
      {renderErrorMsg()}
      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Active</th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      </div>
    </>
  );
};

export default UsersPageComponent;
