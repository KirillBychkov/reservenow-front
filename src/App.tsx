import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from '@/pages/signin/signin.tsx';

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='Content'>
          <Routes>
            <Route path='/signin' element={<Signin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
