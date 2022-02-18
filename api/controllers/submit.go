package controllers

import (
	"api/models"
	"fmt"
	"net/http"
	"net/url"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateSubmit(c *gin.Context) {
	var res Response

	userId := c.GetString("userId")
	modelName := c.PostForm("modelName")
	fileUrl := c.PostForm("fileUrl")
	taskId := c.PostForm("taskId")

	record := models.Record{
		UserId:      userId,
		TaskId:      taskId,
		SubmittedAt: time.Now(),
		Status:      "pending",
		ModelName:   modelName,
		FileUrl:     fileUrl,
	}

	id, err := models.CreateRecord(record)
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	payload := url.Values{
		"id":      {fmt.Sprint(id)},
		"fileUrl": {fileUrl},
		"userId":  {taskId},
		"taskId":  {taskId},
	}
	_, err = DoPost("/", payload)
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	res.Code = 200
	res.Message = "Submit succeed"
	c.JSON(http.StatusOK, &res)
}
