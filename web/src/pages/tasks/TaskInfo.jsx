import React, {useEffect, useState} from "react";
import {Button, Card, Divider, PageHeader, Tabs} from "antd";
import {DownloadOutlined} from '@ant-design/icons'
import { useLocation, useMatch, useParams } from "react-router-dom";

import './taskinfo.css'

const { TabPane } = Tabs;


function TaskInfo() {
  const params = useParams();
  const [task, setTask] = useState({})
  const [dataSet, setDataSet] = useState([])

  useEffect(()=>{
    // get task (id:params.id)
    setTask({
      id: 'sa',
      title: 'Sentiment Analysis',
      description: 'Sentiment analysis is the task of classifying the polarity of a given text.',
    })
    setDataSet([
      {id: '1', title: 'IMDB',
        transformations: [
          {id: '1', title: 'Task Specific Transformations', url: ''},
          {id: '2', title: 'Universal Transformations', url: ''}
        ], description: 'The IMDb dataset is a binary sentiment analysis dataset consisting of 50,000 reviews from the Internet Movie Database (IMDb) labeled as positive or negative. The dataset contains an even number of positive and negative reviews. Only highly polarizing reviews are considered. A negative review has a score ≤ 4 out of 10, and a positive review has a score ≥ 7 out of 10. No more than 30 reviews are included per movie. Models are evaluated based on Accuracy.'},
      {id: '2', title: 'Yelp-Binary', transformations: [
        {id: '1', title: 'Task Specific Transformations', url: ''},
      ], description: 'The Yelp Review dataset consists of more than 500,000 Yelp reviews. There is both a binary and a fine-grained (five-class) version of the dataset. Models are evaluated based on error (1 - Accuracy; lower is better).'},
    ])
    console.log(params.id)
  },[])

  return (
    <Card hoverable className="task-card">
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
      <div className="dataset">Dataset</div>
      {
        dataSet.map((item, index)=>(
          <div className="dataset-card" index={index}>
            <Divider orientation="left">
              <span className="dataset-title">{item.title}</span>
            </Divider>

            <div className="dataset-description">{item.description}</div>

            <div className="dataset-trans">Get transformed dataset</div>
            
            <div className="trans">
              {item.transformations.map((subItem, subIndex)=>(
                <div className="trans-card" index={subIndex}>
                  <span className="trans-title">{subItem.title}</span>
                  <span className="download-bt">
                    <Button type="link" icon={<DownloadOutlined style={{fontSize: '18px'}}/>} />
                  </span>
                </div>
              ))}
            </div>

          </div>
        ))
      }
    </Card>
  )
}

export default TaskInfo;