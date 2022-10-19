import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './Auth';

const  PrivateRoute : React.FC<{ children: JSX.Element}> = ({ children })  =>{
  const auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default PrivateRoute;