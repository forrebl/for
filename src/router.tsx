import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Game from './pages/Game';
import Games from './pages/Games';
import CatchGame from './pages/CatchGame';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects', element: <Projects /> },
      { path: 'project/:id', element: <ProjectDetail /> },
      { path: 'about', element: <About /> },
      { path: 'games', element: <Games /> },
      { path: 'games/cmyk', element: <Game /> },
      { path: 'games/catch', element: <CatchGame /> },
      { path: 'game', element: <Navigate to="/games/cmyk" replace /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
