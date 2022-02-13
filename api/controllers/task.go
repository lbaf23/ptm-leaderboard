package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type TaskResponse struct {
	Response
}

func GetTask(c *gin.Context) {
	res := TaskResponse{
		Response: Response{
			Code: 200,
		},
	}
	c.JSON(http.StatusOK, &res)
}

func GetTaskList(c *gin.Context) {
	res := Response{
		Code:    200,
		Message: "ok",
	}
	c.JSON(http.StatusOK, &res)
}
