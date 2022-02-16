import {Divider} from "antd";
import React, {useEffect, useState} from "react";

import './tasks.css'
import TaskList from "./component/TaskList";
import TaskBackend from "../../backend/TaskBackend";


function Tasks() {
  const [loading, setLoading] = useState(true)
  const [zhLoading, setZhLoading] = useState(true)

  const [tasks, setTasks] = useState([])
  const [zhTasks, setZhTasks] = useState([])

  useEffect(() => {
    TaskBackend.getTaskList("english")
      .then(res => {
        setLoading(false)
        if (res.data.code === 200) {
          setTasks(res.data.taskList)
        } else {
          setTasks([])
        }
      })
      .catch(err => {
      })
    TaskBackend.getTaskList("chinese")
      .then(res => {
        setZhLoading(false)
        if (res.data.code === 200) {
          setZhTasks(res.data.taskList)
        } else {
          setZhTasks([])
        }
      })
      .catch(err => {
      })
  }, [])

  return (
    <div className="mainContent">

      <Divider className="divider" orientation="left">English</Divider>
      <TaskList loading={loading} list={tasks}/>

      <Divider className="divider" orientation="left">Chinese</Divider>
      <TaskList loading={zhLoading} list={zhTasks}/>
    </div>
  )
}

export default Tasks;
