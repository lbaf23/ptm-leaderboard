import React, {useEffect, useState} from "react";
import {Card} from "antd";
import {useParams} from "react-router-dom";

import './taskinfo.css'
import TaskBackend from "../../backend/TaskBackend";
import TaskContent from "./component/TaskContent";

function TaskInfo() {
  const params = useParams();
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState({})

  useEffect(() => {
    TaskBackend.getTask(params.id)
      .then(res => {
        setLoading(false)
        if (res.data.code === 200) {
          setTask(res.data.task)
        }
      })
      .catch(err => {
      })
  }, [])

  return (
    <Card hoverable bordered={false} className="task-card" loading={loading}>
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>

      <div className="task-content">
        <TaskContent task={task} />
      </div>
    </Card>
  )
}

export default TaskInfo;
