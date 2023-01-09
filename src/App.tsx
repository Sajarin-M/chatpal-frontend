import { NotificationsProvider } from '@mantine/notifications';
import { TrpcProvider } from '$context/trpc';
import Login from './pages/login';
import Signup from './pages/signup';

export default function App() {
  return (
    <NotificationsProvider position='top-right'>
      <TrpcProvider>
        <Signup />;
        <Login />;
      </TrpcProvider>
    </NotificationsProvider>
  );
}
