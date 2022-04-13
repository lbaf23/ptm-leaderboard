package controllers

import (
	"api/event"
	"github.com/gin-gonic/gin"
	"net/http"
)

func SendEvent(c *gin.Context) {
	var res Response
	res.Code = 200
	event.Send("sa-30e13288-2143-4064-92a1-141b1b79d8b7", "msg")
	c.JSON(http.StatusOK, res)
}
