import {Route, Routes} from "react-router-dom";
import Home from "../home/Home";
import Callback from "../Auth/Callback";
import Tasks from "../tasks/Tasks";
import TaskLayout from "./TaskLayout";
import TaskInfo from "../tasks/TaskInfo";
import Submit from "../tasks/submit/Submit";
import Rank from "../tasks/rank/Rank";
import RankInfo from "../tasks/rank/RankInfo";
import Record from "../tasks/record/Record";

const PUBLIC_URL = process.env.PUBLIC_URL

function RoutesLayout() {
  return (
    <Routes>
      <Route exact path={PUBLIC_URL} element={<Home />} />


      <Route path={`${PUBLIC_URL}/home`} element={<Home/>}>
        <Route index element={<Home/>} />
        <Route exact path="tasks" element={<Tasks/>}/>

        <Route path="tasks/:id" element={<TaskLayout/>}>
          <Route index element={<TaskInfo/>}/>
          <Route exact path="submit" element={<Submit/>}/>
          <Route exact path="rank" element={<Rank/>}/>
          <Route path="rank/:id" element={<RankInfo/>}/>
          <Route path="record" element={<Record/>}/>
          <Route path="record/:id" element={<TaskInfo/>}/>
        </Route>
      </Route>

      <Route exact path={`${PUBLIC_URL}/callback`} element={<Callback />}/>
    </Routes>
  )
}

export default RoutesLayout
