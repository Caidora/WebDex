import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import  PokemonView  from './PokemonView.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App /> ,
  },
  {
    path: "pokemon/:id",
    element: <PokemonView />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />

  </StrictMode>,
)
