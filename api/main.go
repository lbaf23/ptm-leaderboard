package main

import (
	"api/models"
	"api/routers"
	"api/settings"

	"github.com/gin-contrib/cors"
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

	r.Use(corsMiddleware)
	r.Run(":" + settings.Config.Port)
}
