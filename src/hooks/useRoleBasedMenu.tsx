import { useMemo } from 'react';
import {
  Home,
  People,
  Refresh,
  TimelineEvents,
  GitBranch,
  TimelineBarChart,
  Person,
  Compressed,
  LayoutGrid,
} from '@blueprintjs/icons';
import { useTranslation } from 'react-i18next';
import authStore from '@/store/authStore';
import { UserRole } from '@/types/enums/user';

const useRoleBasedMenu = () => {
  const { t } = useTranslation();
  const userRole = authStore.getUserRole;

  const menuConfig = {
    [UserRole.Superuser]: [
      {
        page: '/',
        icon: <Home />,
        text: 'sidebar.home',
      },
      {
        page: '/users',
        icon: <People />,
        text: 'sidebar.clients',
      },
      {
        page: '/requests',
        icon: <Refresh />,
        text: 'sidebar.requests',
      },
    ],
    [UserRole.UserFull]: [
      {
        page: '/',
        icon: <Home />,
        text: 'sidebar.b2bsidebar.home',
      },
      {
        page: '/schedule',
        icon: <TimelineEvents />,
        text: 'sidebar.b2bsidebar.schedule',
      },
      {
        page: '/booking',
        icon: <GitBranch />,
        text: 'sidebar.b2bsidebar.booking',
      },
      {
        page: '/clients',
        icon: <People />,
        text: 'sidebar.b2bsidebar.clients',
      },
      {
        page: '/organizations',
        icon: <LayoutGrid />,
        text: 'sidebar.b2bsidebar.organizations',
      },
      {
        page: '/equipment',
        icon: <Compressed />,
        text: 'sidebar.b2bsidebar.products',
      },
      {
        page: '/personnel',
        icon: <Person />,
        text: 'sidebar.b2bsidebar.personnel',
      },
      {
        page: '/statistics',
        icon: <TimelineBarChart />,
        text: 'sidebar.b2bsidebar.statistics',
      },
    ],
    [UserRole.Default]: [
      {
        page: '/',
        icon: <Home />,
        text: 'sidebar.home',
      },
    ],
  };

  const menu = useMemo(() => {
    const config = menuConfig[userRole] || menuConfig[UserRole.Default];
    return config.map((item) => ({
      ...item,
      text: t(item.text),
    }));
  }, [userRole, t]);

  return menu;
};

export default useRoleBasedMenu;
