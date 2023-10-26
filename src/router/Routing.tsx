import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { routes } from './routes';

// (?) Create 404 Page

const Routing: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute
                redirectPath='/signin'
                isProtected={route.isProtected}
                allowedRoles={route.allowedRoles}
              >
                {route.element}
              </ProtectedRoute>
            }
          />
        );
      })}
      {/* For undefined routes */}
      <Route
        path='*'
        element={<ProtectedRoute redirectPath='/signin'>{404}</ProtectedRoute>}
      />
    </Routes>
  );
};
export default Routing;
