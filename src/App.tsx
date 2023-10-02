import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from '@/pages/signin/signin.tsx';
import Home from '@/pages/home/home';
import Clients from '@/pages/superadminPages/clients/clients';
import Requests from '@/pages/superadminPages/requests/requests';
import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import Flex from '@/components/UI/layout/flex';
import AddClient from '@/pages/superadminPages/clients/addClient/addClient';
import ViewClient from './pages/superadminPages/clients/viewClient/viewClient';
import UseProtectedRoute from './hooks/useProtectedRoute';
import ActivateAccount from './pages/b2bPages/activateAccount/activateAccount';
import OpenRequest from './pages/superadminPages/requests/openRequest/openRequest';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* Routes without Header and Sidebar */}
          <Route path='/signin' element={<Signin />} />
          {/* Route for b2bclient testing purposes */}
          <Route path='/activate-account' element={<ActivateAccount />} />

          {/* Routes with Header and Sidebar */}
          <Route
            path='*'
            element={
              <UseProtectedRoute redirectPath='/signin'>
                <Header />
                <Flex>
                  <Sidebar />
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/clients' element={<Clients />} />
                    <Route path='/clients/add' element={<AddClient />} />
                    <Route path='/clients/:id/edit' element={<AddClient />} />
                    <Route path='/clients/:id' element={<ViewClient />} />
                    <Route path='/requests' element={<Requests />} />
                    <Route path='/requests/:id' element={<OpenRequest />} />
                  </Routes>
                </Flex>
              </UseProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
