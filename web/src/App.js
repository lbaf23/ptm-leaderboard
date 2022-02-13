import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainLayout from './pages/layout/MainLayout';
import RoutesLayout from './pages/layout/RoutesLayout';

function App() {
  return (
    <BrowserRouter>
      <RoutesLayout />
    </BrowserRouter>
  );
}

export default App;
