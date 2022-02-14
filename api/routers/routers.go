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
		authGroup.GET("/account", controllers.GetAccount)
	}

	rankListGroup := r.Group("/ranklist")
	rankListGroup.Use(AuthMiddleware())
	{
		rankListGroup.GET("/", controllers.GetRankList)
	}
	rankGroup := r.Group("/rank/:id")
	rankGroup.Use()
	{
		rankGroup.GET("/", controllers.GetRecord)
		rankGroup.POST("/", controllers.CreateRecord)
		rankGroup.DELETE("/", controllers.DeleteRecord)
	}

	taskListGroup := r.Group("/tasklist/:type")
	taskListGroup.Use()
	{
		taskListGroup.GET("/", controllers.GetTaskList)
	}

	taskGroup := r.Group("/task/:id")
	taskGroup.Use()
	{
		taskGroup.GET("/", controllers.GetTask)
	}

	submitGroup := r.Group("/submit")
	submitGroup.Use(AuthMiddleware())
	{
		submitGroup.POST("/", controllers.CreateRecord)
	}

	recordGroup := r.Group("/record/:id")
	recordGroup.Use(AuthMiddleware())
	{
		recordGroup.GET("/", controllers.GetRecord)
		recordGroup.POST("/", controllers.CreateRecord)
		recordGroup.DELETE("/", controllers.DeleteRecord)
	}
}
