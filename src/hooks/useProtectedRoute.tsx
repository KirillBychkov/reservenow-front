import { Navigate } from 'react-router-dom';

interface ProtectedRoute {
  redirectPath: string;
  children: React.ReactNode;
}

const UseProtectedRoute: React.FC<ProtectedRoute> = ({
  redirectPath,
  children,
}) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!token || !refreshToken) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default UseProtectedRoute;
