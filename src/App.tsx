import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './router/Routing';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Routing />
      </div>
    </Router>
  );
};

export default App;
