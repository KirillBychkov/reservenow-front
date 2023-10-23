import ActivateAccountForm from '@/components/b2bclient/forms/ActivateAccountForm';

import Home from '@/pages/home/home';
import Signin from '@/pages/signin/signin';

import Organizations from '@/pages/b2bPages/organizations/organizations';
import AddOrganization from '@/pages/b2bPages/organizations/addOrganisation/addOrganization';
import ViewOrganization from '@/pages/b2bPages/organizations/viewOrganisation/viewOrganization';
import Clients from '@/pages/superadminPages/clients/clients';
import AddClient from '@/pages/superadminPages/clients/addClient/addClient';
import ViewClient from '@/pages/superadminPages/clients/viewClient/viewClient';
import Requests from '@/pages/superadminPages/requests/requests';
import OpenRequest from '@/pages/superadminPages/requests/openRequest/openRequest';

interface IRoute {
  path: string;
  element: React.ReactNode;
  isProtected: boolean;
  params?: Record<string, string>;
}

export const routes: IRoute[] = [
  { path: '/', element: <Home />, isProtected: true },
  { path: '/signin', element: <Signin />, isProtected: false },
  {
    path: '/activate-account',
    element: <ActivateAccountForm />,
    isProtected: false,
  },
  { path: '/clients', element: <Clients />, isProtected: true },
  { path: '/clients/add', element: <AddClient />, isProtected: true },
  {
    path: '/clients/:id/edit',
    element: <AddClient />,
    isProtected: true,
    params: { id: ':id' },
  },
  {
    path: '/clients/:id',
    element: <ViewClient />,
    isProtected: true,
    params: { id: ':id' },
  },
  { path: '/requests', element: <Requests />, isProtected: true },
  { path: '/requests/:id', element: <OpenRequest />, isProtected: true },
  { path: '/organizations', element: <Organizations />, isProtected: true },
  {
    path: '/organizations/add',
    element: <AddOrganization />,
    isProtected: true,
  },
  {
    path: '/organizations/:id',
    element: <ViewOrganization />,
    isProtected: true,
    params: { id: 'id' },
  },
];
