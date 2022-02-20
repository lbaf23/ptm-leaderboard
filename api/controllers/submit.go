package controllers

import (
	"api/models"
	"bytes"
	"encoding/json"
	"net/http"
	"time"

	"github.com/casdoor/casdoor-go-sdk/auth"
	"github.com/gin-gonic/gin"
)

type SubmitAttack struct {
	Id        uint   `json:"id"`
	FileUrl   string `json:"fileUrl"`
	UserId    string `json:"userId"`
	UserName  string `json:"userName"`
	TaskId    string `json:"taskId"`
	ModelName string `json:"modelName"`
}

func CreateSubmit(c *gin.Context) {
	var res Response

	token := c.Query("token")
	claims, _ := auth.ParseJwtToken(token)

	userId := c.GetString("userId")
	userName := claims.Name
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
		Result:      "[]",
	}

	id, err := models.CreateRecord(record)
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}

	body := &SubmitAttack{
		Id:        id,
		FileUrl:   fileUrl,
		UserId:    userId,
		UserName:  userName,
		TaskId:    taskId,
		ModelName: modelName,
	}
	buf := new(bytes.Buffer)
	json.NewEncoder(buf).Encode(body)
	_, err = DoPost("/", buf)

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
