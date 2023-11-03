import Home from '@/pages/home/home';
import Signin from '@/pages/signin/signin';
import Organizations from '@/pages/b2bPages/organizations/organizations';
import AddOrganization from '@/pages/b2bPages/organizations/addOrganisation/addOrganization';
import ViewOrganization from '@/pages/b2bPages/organizations/viewOrganisation/viewOrganization';
import Clients from '@/pages/superadminPages/clients/clients';
import AddClient from '@/pages/superadminPages/clients/addClient/addClient';
import ViewClient from '@/pages/superadminPages/clients/viewClient/viewClient';
import Requests from '@/pages/superadminPages/requests/requests';
import EditOrganization from '@/pages/b2bPages/organizations/editOrganization/editOrganization';
import { UserRole } from '@/types/enums/user';
import ActivateAccount from '@/pages/b2bPages/activateAccount/activateAccount';
import OpenRequest from '@/pages/superadminPages/requests/openRequest/openRequest';
import Personnel from '@/pages/b2bPages/personnel/personnel';
import AddPersonnel from '@/pages/b2bPages/personnel/addPersonnel/addPersonnel';

interface IRoute {
  path: string;
  element: React.ReactNode;
  isProtected?: boolean;
  params?: Record<string, string>;
  allowedRoles?: UserRole[];
}

export const routes: IRoute[] = [
  {
    path: '/',
    element: <Home />,
    isProtected: true,
  },
  { path: '/signin', element: <Signin />, isProtected: false },
  {
    path: '/activate-account',
    element: <ActivateAccount />,
    isProtected: false,
  },
  {
    path: '/clients',
    element: <Clients />,
    isProtected: true,
    allowedRoles: [UserRole.Superuser, UserRole.UserFull],
  },
  {
    path: '/clients/add',
    element: <AddClient />,
    isProtected: true,
    allowedRoles: [UserRole.Superuser, UserRole.UserFull],
  },
  {
    path: '/clients/:id/edit',
    element: <AddClient />,
    isProtected: true,
    params: { id: ':id' },
    allowedRoles: [UserRole.Superuser, UserRole.UserFull],
  },
  {
    path: '/clients/:id',
    element: <ViewClient />,
    isProtected: true,
    params: { id: ':id' },
    allowedRoles: [UserRole.Superuser, UserRole.UserFull],
  },
  {
    path: '/requests',
    element: <Requests />,
    isProtected: true,
    allowedRoles: [UserRole.Superuser],
  },
  {
    path: '/requests/:id',
    element: <OpenRequest />,
    isProtected: true,
    allowedRoles: [UserRole.Superuser],
  },
  {
    path: '/organizations',
    element: <Organizations />,
    isProtected: true,
    allowedRoles: [UserRole.UserFull],
  },
  {
    path: '/organizations/add',
    element: <AddOrganization />,
    isProtected: true,
    allowedRoles: [UserRole.UserFull],
  },
  {
    path: '/organizations/:id',
    element: <ViewOrganization />,
    isProtected: true,
    params: { id: 'id' },
    allowedRoles: [UserRole.UserFull],
  },
  {
    path: '/organizations/:id/edit',
    element: <EditOrganization />,
    isProtected: true,
    params: { id: 'id' },
    allowedRoles: [UserRole.UserFull],
  },
  {
    path: '/personnel',
    element: <Personnel />,
    isProtected: true,
    allowedRoles: [UserRole.UserFull],
  },
  {
    path: '/personnel/add',
    element: <AddPersonnel />,
    isProtected: true,
    allowedRoles: [UserRole.UserFull],
  },
];
