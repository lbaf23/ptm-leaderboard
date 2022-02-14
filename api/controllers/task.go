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
	} else {
		res.Code = 200
		res.Task = task
	}
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
	} else {
		res.Code = 200
		res.TaskList = tasks
	}
	c.JSON(http.StatusOK, &res)
}
