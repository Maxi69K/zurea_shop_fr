import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activateAccount } from "../services/user.service";
import { toast } from "react-toastify";

const ActivationAccountPageComponent = () => {
    const [message, setMessage] = useState('');
    const {userId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('UserId --->', userId);
        if (userId) {
            activateAccount(userId)
                .then((response) => {
                    console.log(response);
                    setMessage('Successfully activated account. Redirecting to login page...');
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000)
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(error.status === 410 ? error?.response?.data : error.message);
                })
        } else {
            toast.error('Not valid user for activation.');
            navigate('/');
        }
    }, [userId]);

  return (
    <div className="d-flex justify-content-center align-content-center flex-column text-center p-3">
      <h1>Activate account page</h1>
      <p className="text-success">{message}</p>
    </div>
  );
}

export default ActivationAccountPageComponent;