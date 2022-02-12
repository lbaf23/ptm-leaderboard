import {Button, Card, Col, Row, Image, Tag, Divider} from "antd";
import React, { useEffect, useState } from "react";
import {ArrowRightOutlined, TeamOutlined, EyeOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom";

import './tasks.css'

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
};

function Tasks() {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    setLoading(false)
    // TODO get tasks
    setTasks([
      {id: 'sa', title: 'Sentiment Analysis', description: 'Sentiment analysis is the task of classifying the polarity of a given text.'},
      {id: 'ner', title: 'Named Entity Recognition', description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'},
      {id: 'ner', title: 'Named Entity Recognition', description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'},
      {id: 'ner', title: 'Named Entity Recognition', description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'},
      {id: 'ner', title: 'Named Entity Recognition', description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'},
      {id: 'ner', title: 'Named Entity Recognition', description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'},
      {id: 'ner', title: 'Named Entity Recognition', description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'},
      {id: 'ner', title: 'Named Entity Recognition', description: 'Named entity recognition is the task of tagging entities in text with their corresponding type.'},
    ])
  }, [])

    return (
      <div className="mainContent">
        <Divider className="divider" orientation="left">English</Divider>
        <Row gutter={[20, 20]}>
          {
            tasks.map((item, index) => (
              <Col key={index.toString()}  {...topColResponsiveProps}>
                <Link to={item.id}>
                  <Card
                    hoverable
                    bordered={false}
                    style={{
                      borderRadius: '10px',
                      flexGrow: 1
                    }}
                  >
                  <div className="card-content">
                    <div className="card-title">
                      <span>
                        <Image
                        src={require(`../../assets/tasks/${item.id}.jpg`)}
                        preview={false}
                        width={90}
                        height={90}
                        style={{
                          borderRadius: '5px'
                        }}
                        />
                      </span>
                      <span className="task-item-title">{item.title}</span>
                    </div>
                    <div className="task-item-description">
                      {item.description}
                    </div>
                  </div>
                  </Card>
                </Link>
              </Col>
            ))
          }
        </Row>
      </div>
    )
}

export default Tasks;