import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EarningsCalendar from './components/EarningsCalendar/EarningsCalendar';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EarningsCalendar />
    </QueryClientProvider>
  );
}

export default App;