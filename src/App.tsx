import { useRoutes, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';

import { queryClient } from './services';
import { routes } from './router';
import { cloneElement } from 'react';

const App = () => {
  const element = useRoutes(routes);
  const location = useLocation();

  if (!element) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </QueryClientProvider>
  );
};

export default App;
