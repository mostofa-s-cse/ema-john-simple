import {
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const PrivateRoute = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let location = useLocation();
  if (!loggedInUser.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoute;