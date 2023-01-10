import { Navigate, Route, Routes } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';
import AuthProvider, { useAuth } from '$context/auth';
import { TrpcProvider } from '$context/trpc';
import Chats from './pages/chats';
import Login from './pages/login';
import Logout from './pages/logout';
import Signup from './pages/signup';

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

function AppInner() {
  const { user } = useAuth();

  return (
    <NotificationsProvider position='top-right'>
      <TrpcProvider>
        <Routes>
          <Route path='*' element={<div>page notfound</div>} />
          <Route path='/' element={user ? <Navigate to='chats' /> : <Navigate to='login' />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='chats' element={<Chats />} />
        </Routes>
      </TrpcProvider>
    </NotificationsProvider>
  );
}
