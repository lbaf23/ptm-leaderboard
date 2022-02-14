package main

import (
	"api/conf"
	"api/controllers"
	"api/models"
	"api/routers"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func corsMiddleware(c *gin.Context) {
	method := c.Request.Method
	origin := c.Request.Header.Get("Origin")
	if origin != "" {
		c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, UPDATE")
		c.Header("Access-Control-Allow-Credentials", "true")
	}
	if method == "OPTIONS" {
		c.JSON(http.StatusOK, "Options Request!")
	}
	c.Next()
}

func main() {
	conf.Init()
	gin.SetMode(conf.Config.RunMode)
	r := gin.Default()

	r.Use(corsMiddleware)

	routers.Init(r)
	models.Init()
	controllers.InitCasdoor()

	server := fmt.Sprintf(":%s", conf.Config.HttpPort)
	r.Run(server)
}
