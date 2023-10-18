import Flex from '@/components/UI/layout/flex';
import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import { Navigate } from 'react-router-dom';

interface ProtectedRoute {
  redirectPath: string;
  children: React.ReactNode;
  isProtected?: boolean;
}
/**
 * A HOC that handles route protection.
 **/

const ProtectedRoute: React.FC<ProtectedRoute> = ({
  redirectPath,
  children,
  isProtected,
}) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  // If the route is protected and the user is not authenticated, redirect
  if (isProtected && (!token || !refreshToken)) {
    return <Navigate to={redirectPath} replace />;
  }

  // Render the protected route with Header and Sidebar if applicable
  return isProtected ? (
    <>
      <Header />
      <Flex>
        <Sidebar />
        {children}
      </Flex>
    </>
  ) : (
    <>{children}</>
  );
};

export default ProtectedRoute;
