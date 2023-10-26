import Flex from '@/components/UI/layout/flex';
import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import authStore from '@/store/AuthStore';
import { UserRole } from '@/types/enums/user';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

interface ProtectedRoute {
  redirectPath: string;
  children: React.ReactNode;
  isProtected?: boolean;
  allowedRoles?: UserRole[];
}
/**
 * A HOC that handles route protection.
 **/

const ProtectedRoute: React.FC<ProtectedRoute> = ({
  redirectPath,
  children,
  isProtected,
  allowedRoles,
}) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const userRole = authStore.getUserRole;

  // If the route is protected and the user is not authenticated, redirect
  if (isProtected && (!token || !refreshToken)) {
    return <Navigate to={redirectPath} replace />;
  }
  // If the role is not in the list of allowed roles, redirect
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to='/' replace />;
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

export default observer(ProtectedRoute);
