import { BrowserRouter } from 'react-router-dom';
import './App.css';
//import RoutesLayout from './pages/layout/RoutesLayout';
import React, {lazy, Suspense} from "react";
import Loading from "./pages/Loading";

const RoutesLayout = lazy(() => import('./pages/layout/RoutesLayout'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <RoutesLayout />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
