import {Button} from "antd";
import {EditOutlined, SaveOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import MDEditor from '@uiw/react-md-editor';
import TaskBackend from "../../../../backend/TaskBackend";
import {useParams} from "react-router-dom";


function SubmitDescription() {
  const params = useParams()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editable, setEditable] = useState(false)

  const [content, setContent] = useState('')

  useEffect(()=>{
    TaskBackend.getTaskSubmitDescription(params.id)
      .then(res=>{
        if(res.data.code === 200) {
          setContent(res.data.content)
        }
      })
      .catch(err=>{})
    setEditable(true)
  }, [])

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = () => {
    setSaving(true)
    TaskBackend.updateTaskSubmitDescription(params.id, content)
      .then(res=>{
        setSaving(false)
        if (res.data.code === 200) {
          setEditing(false)
        }
      })
      .catch(err=>{})
  }

  const handleChange = (value) => {
    setContent(value)
  }

  return (
    <div style={{marginTop: '40px'}}>
      {editable ?
        <div style={{textAlign: 'right'}}>
          {editing ?
            <Button loading={saving} type="text" icon={<SaveOutlined/>} onClick={handleSave}/> :
            <Button type="text" icon={<EditOutlined/>} onClick={handleEdit}/>
          }
        </div> : null
      }
      <div style={{marginTop: '5px'}}>
        {editing ?
          <MDEditor value={content} onChange={handleChange} height="100%" /> :
          <MDEditor.Markdown source={content} />
        }
      </div>
    </div>
  )
}

export default SubmitDescription
