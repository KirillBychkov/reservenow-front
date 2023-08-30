import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from '@/pages/signin/signin.tsx';
import Home from '@/pages/home/home';
import Clients from '@/pages/clients/clients';
import Requests from '@/pages/requests/requests';
import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import Flex from './components/UI/layout/flex';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Flex>
          <Sidebar />
          <Routes>
            <Route path='/signin' element={<Signin />} />
            <Route path='/' element={<Home />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/requests' element={<Requests />} />
          </Routes>
        </Flex>
      </div>
    </Router>
  );
};

export default App;
