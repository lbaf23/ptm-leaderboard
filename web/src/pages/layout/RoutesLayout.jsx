import {Route, Routes, useNavigate} from "react-router-dom";
import Callback from "../Auth/Callback";
import MainLayout from "./MainLayout";
import { useEffect } from "react";

const PUBLIC_URL = process.env.PUBLIC_URL

function Redirect({to}) {
  let navigate = useNavigate();
  useEffect(()=>{
    navigate(to)
  });
  return null;
}

function RoutesLayout() {
  return (
    <Routes>
      <Route path={PUBLIC_URL}>
        <Route index element={<Redirect to="home"/>} />

        <Route path="home/*" element={<MainLayout/>}/>

        <Route exact path={`${PUBLIC_URL}/callback`} element={<Callback />}/>
      </Route>
    </Routes>
  )
}

export default RoutesLayout
