import { TrpcProvider } from '$context/trpc';
import Signup from './pages/signup';

export default function App() {
  return (
    <TrpcProvider>
      <Signup />;
    </TrpcProvider>
  );
}
