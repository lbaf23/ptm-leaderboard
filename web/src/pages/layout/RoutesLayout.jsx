import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "../home/Home";
import Callback from "../Auth/Callback";
import Tasks from "../tasks/Tasks";
import TaskLayout from "./TaskLayout";
import TaskInfo from "../tasks/TaskInfo";
import Submit from "../tasks/submit/Submit";
import Rank from "../tasks/rank/Rank";
import Record from "../tasks/record/Record";
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

        <Route path="home" element={<MainLayout/>}>
          <Route index element={<Home/>} />
          <Route path="tasks" element={<Tasks/>}/>
          <Route path="tasks/:id" element={<TaskLayout/>}>
            <Route index element={<TaskInfo/>}/>
            <Route exact path="submit" element={<Submit/>}/>
            <Route exact path="rank" element={<Rank/>}/>
            <Route path="record" element={<Record/>}/>
            <Route path="record/:id" element={<TaskInfo/>}/>
          </Route>
        </Route>

        <Route exact path={`${PUBLIC_URL}/callback`} element={<Callback />}/>
      </Route>
    </Routes>
  )
}

export default RoutesLayout
