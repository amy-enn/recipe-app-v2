import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root from './routes/Root.tsx';
import { RecipeProvider } from './context/RecipeContext.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecipeProvider>
    <RouterProvider router={router} />
    </RecipeProvider>
  </StrictMode>
)
