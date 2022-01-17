import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainLayout from './pages/layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
