package main

import (
	"api/models"
	"api/routers"
	"api/settings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	settings.Setup()
	models.Setup()
}

func main() {
	r := routers.InitRouter()
	corsMiddleware := cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
	})

	gin.SetMode(settings.Config.RunMode)

	r.Use(corsMiddleware)
	r.Run(":8000")
}
