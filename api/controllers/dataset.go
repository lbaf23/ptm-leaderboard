package controllers

import (
	"api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DataSetResponse struct {
	Response
	DataSets []models.DataSet `json:"datasets"`
}

func GetTaskDataSets(c *gin.Context) {
	var res DataSetResponse
	taskId := c.Query("taskId")
	res.Code = 200
	res.DataSets = models.GetTaskDataSets(taskId)
	c.JSON(http.StatusOK, &res)
}
