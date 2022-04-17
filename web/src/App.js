import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RoutesLayout from './pages/layout/RoutesLayout';
import React, {Suspense} from "react";

function App() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <BrowserRouter>
        <RoutesLayout />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
