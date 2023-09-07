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
import { UserStatus } from './types/user';

const App = () => {
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
              <>
                <Header />
                <Flex>
                  <Sidebar />
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/clients' element={<Clients />} />
                    <Route path='/clients/add' element={<AddClient />} />
                    <Route
                      path='/clients/view'
                      element={
                        <ViewClient
                          initialValues={{
                            firstName: 'Nazar',
                            lastName: 'Vovk',
                            id: 1,
                            email: 'nvovk.2004@gmail.com',
                            phone: '+380683036415',
                            companyName: 'Ficus Technologies',
                            status: UserStatus.PENDING,
                            description: 'Lorem ipsum dolor sit amet',
                          }}
                        />
                      }
                    />
                    <Route path='/requests' element={<Requests />} />
                  </Routes>
                </Flex>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
