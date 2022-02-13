package main

import (
	"api/conf"
	"api/controllers"
	"api/models"
	"api/routers"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	conf.Init()
	gin.SetMode(conf.Config.RunMode)
	r := gin.Default()

	corsMiddleware := cors.New(cors.Config{
		AllowOrigins:     []string{conf.Config.AllowOrigin},
		AllowCredentials: true,
	})
	r.Use(corsMiddleware)

	routers.Init(r)
	models.Init()
	controllers.InitCasdoor()

	server := fmt.Sprintf(":%s", conf.Config.HttpPort)
	r.Run(server)
}
