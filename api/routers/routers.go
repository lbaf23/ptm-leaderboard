package routers

import (
	"api/controllers"

	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	router := gin.New()

	recordGroup := router.Group("/record/:id")
	recordGroup.Use()
	{
		recordGroup.GET("/", controllers.GetRecord)
		recordGroup.POST("/", controllers.CreateRecord)
		recordGroup.DELETE("/", controllers.DeleteRecord)
	}

	return router
}
