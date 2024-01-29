import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './router/Routing';
import authStore from './store/authStore';
import { observer } from 'mobx-react-lite';

const isProductionMode = import.meta.env.MODE === 'production';

const navigateToSubDomain = (subdomain: string) => {
  const { protocol, host, pathname } = location;
  location.href = `${protocol}//${subdomain}.${host}${pathname}`;
};

const App = observer(() => {
  const domain = authStore.getUserDomain;
  const isDomainInUrl = domain && location.host.split('.')[0] !== domain;

  if (isDomainInUrl && isProductionMode) {
    navigateToSubDomain(domain);
  }

  return (
    <Router>
      <div className='App'>
        <Routing />
      </div>
    </Router>
  );
});

export default App;
