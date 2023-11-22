import Home from '@/pages/home/home';
import Signin from '@/pages/signin/signin';
import Organizations from '@/pages/b2bPages/organizations/organizations';
import ManageOrganisation from '@/pages/b2bPages/organizations/manageOrganization/manageOrganization';
import ViewOrganization from '@/pages/b2bPages/organizations/viewOrganisation/viewOrganization';
import Users from '@/pages/superadminPages/users/users';
import ManageUser from '@/pages/superadminPages/users/manageUser/manageUser';
import ViewClient from '@/pages/superadminPages/users/viewUser/viewUser';
import Requests from '@/pages/superadminPages/requests/requests';
import { UserRole } from '@/types/enums/user';
import ActivateAccount from '@/pages/b2bPages/activateAccount/activateAccount';
import OpenRequest from '@/pages/superadminPages/requests/openRequest/openRequest';
import Personnel from '@/pages/b2bPages/personnel/personnel';
import AddPersonnel from '@/pages/b2bPages/personnel/addPersonnel/addPersonnel';
import ContactUs from '@/pages/b2bPages/contactUs/contactUs';
import FAQ from '@/pages/b2bPages/faq/faq';
import ManageObject from '@/pages/b2bPages/objects/manageObject/manageObject';

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
    path: '/users',
    element: <Users />,
    isProtected: true,
    allowedRoles: [UserRole.Superuser],
  },
  {
    path: '/users/add',
    element: <ManageUser />,
    isProtected: true,
    allowedRoles: [UserRole.Superuser],
  },
  {
    path: '/users/:id/edit',
    element: <ManageUser />,
    isProtected: true,
    params: { id: ':id' },
    allowedRoles: [UserRole.Superuser],
  },
  {
    path: '/users/:id',
    element: <ViewClient />,
    isProtected: true,
    params: { id: ':id' },
    allowedRoles: [UserRole.Superuser],
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
    element: <ManageOrganisation />,
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
    element: <ManageOrganisation />,
    isProtected: true,
    params: { id: 'id' },
    allowedRoles: [UserRole.UserFull],
  },
  {
    path: '/organizations/:id/objects/add',
    element: <ManageObject />,
    isProtected: true,
    params: { id: 'id' },
    allowedRoles: [UserRole.UserFull],
  },
  {
    path: '/organizations/:id/objects/:objectId/edit',
    element: <ManageObject />,
    isProtected: true,
    params: { id: 'id', objectId: 'objectId' },
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
  {
    path: '/contact-us',
    element: <ContactUs />,
    isProtected: true,
    allowedRoles: [UserRole.UserFull],
  },
  {
    path: '/faq',
    element: <FAQ />,
    isProtected: true,
    allowedRoles: [UserRole.UserFull],
  },
];
