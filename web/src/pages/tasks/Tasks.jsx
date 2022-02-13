import {Card, Col, Divider, Image, Row} from "antd";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import './tasks.css'
import TaskList from "./component/TaskList";



function Tasks() {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [zhTasks, setZhTasks] = useState([])

  useEffect(() => {
    setLoading(false)
    // TODO get tasks
    setTasks([
      {
        id: 'sa',
        title: 'Sentiment Analysis',
        description: 'Sentiment analysis is the task of classifying the polarity of a given text.'
      },
      {
        id: 'ner',
        title: 'Named Entity Recognition',
        description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'
      },
      {
        id: 'ner',
        title: 'Named Entity Recognition',
        description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'
      },
      {
        id: 'ner',
        title: 'Named Entity Recognition',
        description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'
      },
      {
        id: 'ner',
        title: 'Named Entity Recognition',
        description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'
      },
      {
        id: 'ner',
        title: 'Named Entity Recognition',
        description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'
      },
      {
        id: 'ner',
        title: 'Named Entity Recognition',
        description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'
      },
      {
        id: 'ner',
        title: 'Named Entity Recognition',
        description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'
      },
    ])

    setZhTasks([
      {
        id: 'cws',
        title: 'Chinese Word Segmentation',
        description: 'Chinese Word Segmentation is the task of segmenting the correct words in a specific context.'
      }
    ])
  }, [])

  return (
    <div className="mainContent">

      <Divider className="divider" orientation="left">English</Divider>
      <TaskList list={tasks} />

      <Divider className="divider" orientation="left">Chinese</Divider>
      <TaskList list={zhTasks} />
    </div>
  )
}

export default Tasks;
