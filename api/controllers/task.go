package controllers

import (
	"api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TaskResponse struct {
	Response
	Task models.Task `json:"task"`
}

func GetTask(c *gin.Context) {
	var res TaskResponse
	id := c.Param("id")
	task, err := models.GetTaskById(id)
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	res.Code = 200
	res.Task = task
	c.JSON(http.StatusOK, &res)
}

type TaskSubmitDescriptionResponse struct {
	Response
	Content string `json:"content"`
}

func GetTaskSubmitDescription(c *gin.Context) {
	var res TaskSubmitDescriptionResponse
	id := c.Param("id")
	content, err := models.GetTaskSubmitDescriptionById(id)
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	res.Code = 200
	res.Content = content
	c.JSON(http.StatusOK, &res)
}

type TaskListResponse struct {
	Response
	TaskList []models.Task `json:"taskList"`
}

func GetTaskList(c *gin.Context) {
	var res TaskListResponse
	t := c.Param("type")
	tasks, err := models.GetTaskList(t)
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	res.Code = 200
	res.TaskList = tasks
	c.JSON(http.StatusOK, &res)
}

func UpdateTask(c *gin.Context) {
	var res Response
	id := c.Param("id")
	content := c.PostForm("content")
	err := models.UpdateTaskContent(id, content)
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	res.Code = 200
	c.JSON(http.StatusOK, &res)
}

func UpdateTaskSubmitDescription(c *gin.Context) {
	var res Response
	id := c.Param("id")
	content := c.PostForm("content")
	err := models.UpdateTaskSubmitContent(id, content)
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	res.Code = 200
	c.JSON(http.StatusOK, &res)
}
