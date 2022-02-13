import {Card, Col, Image, Row} from "antd";
import {Link} from "react-router-dom";
import React from "react";

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
};

function TaskList(obj) {
  return (
    <Row gutter={[20, 20]}>
      {
        obj.list.map((item, index) => (
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
                          src={require(`../../../assets/tasks/${item.id}.jpg`)}
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
  )
}

export default TaskList
