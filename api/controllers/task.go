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
	task := models.GetTaskById(id)
	res.Code = 200
	res.Task = task
	c.JSON(http.StatusOK, &res)
}

type TaskListResponse struct {
	Response
	TaskList []models.Task `json:"taskList"`
}

func GetTaskList(c *gin.Context) {
	var res TaskListResponse
	t := c.Param("type")
	tasks := models.GetTaskList(t)
	res.Code = 200
	res.TaskList = tasks
	c.JSON(http.StatusOK, &res)
}
