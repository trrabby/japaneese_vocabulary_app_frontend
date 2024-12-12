import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routers/Routers.jsx';
import React from 'react';
import { ContextProvider } from './Providers/ContextProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ContextProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ContextProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode >

)
