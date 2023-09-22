import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from '@/pages/signin/signin.tsx';
import Home from '@/pages/home/home';
import Clients from '@/pages/clients/clients';
import Requests from '@/pages/requests/requests';
import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import Flex from '@/components/UI/layout/flex';
import AddClient from '@/pages/clients/addClient/addClient';
import ViewClient from './pages/clients/viewClient/viewClient';
import { observer } from 'mobx-react-lite';
import UseProtectedRoute from './hooks/useProtectedRoute';

const App = observer(() => {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* Routes without Header and Sidebar */}
          <Route path='/signin' element={<Signin />} />

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
                  </Routes>
                </Flex>
              </UseProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
});

export default App;
