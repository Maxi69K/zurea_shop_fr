import { isAdminUser } from '../services/auth.service';
import { Navigate } from 'react-router-dom';

const AdminGuardComponent = ({ children }) => {
  return isAdminUser() ? children : <Navigate to='/' />
};

export default AdminGuardComponent;
