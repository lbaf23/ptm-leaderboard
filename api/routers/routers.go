package routers

import (
	"api/controllers"

	"github.com/gin-gonic/gin"
)

func Init(r *gin.Engine) {
	authGroup := r.Group("/auth")
	authGroup.Use()
	{
		authGroup.POST("/login", controllers.Login)
		authGroup.POST("/logout", controllers.Logout)
	}

	recordGroup := r.Group("/record/:id")
	recordGroup.Use()
	{
		recordGroup.GET("/", controllers.GetRecord)
		recordGroup.POST("/", controllers.CreateRecord)
		recordGroup.DELETE("/", controllers.DeleteRecord)
	}

	r.GET("/tasklist", controllers.GetTaskList)
	taskGroup := r.Group("/task")
	taskGroup.Use()
	{
		taskGroup.GET("/", controllers.GetTask)
	}
}
