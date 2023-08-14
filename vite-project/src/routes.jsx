import HealthLogsPage from './pages/health-log-page/HealthLogPage';
import Medications from './pages/medications-page/Medications';
import PageTemplate from './layouts/page-template/PageTemplate';
import PetListPage from './pages/pet-list-page/PetListPage';
import PrescriptionsPage from './pages/prescriptions-log-page/PrescriptionsPage';
import { createBrowserRouter } from 'react-router-dom';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PageTemplate />,
    children: [
      {
        path: '/',
        element: <PetListPage />,
      },
      {
        path: '/healthLogs/:id',
        element: <HealthLogsPage />,
      },
      {
        path: '/prescriptions/:id',
        element: <PrescriptionsPage />,
      },
      {
        path: '/medications',
        element: <Medications />,
      },
    ],
  },
]);
