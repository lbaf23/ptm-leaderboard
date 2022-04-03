package controllers

import (
	"api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ContentResponse struct {
	Response
	Content string `json:"content"`
}

func GetHomeContent(c *gin.Context) {
	var res ContentResponse
	res.Code = 200
	res.Content = models.GetHomeContent()
	c.JSON(http.StatusOK, &res)
}

func UpdateHomeContent(c *gin.Context) {
	var res Response
	content := c.PostForm("content")
	err := models.UpdateHomeContent(content)
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	res.Code = 200
	c.JSON(http.StatusOK, &res)
}
