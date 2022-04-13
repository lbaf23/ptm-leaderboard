package routers

import (
	"api/controllers"

	"github.com/gin-gonic/gin"
)

func Init(r *gin.Engine) {
	r.GET("/test", controllers.SendEvent)

	authGroup := r.Group("/auth")
	authGroup.Use()
	{
		authGroup.POST("/login/", controllers.Login)
		authGroup.POST("/logout/", controllers.Logout)
		authGroup.GET("/account/", controllers.GetAccount)
	}

	homeGroup := r.Group("/home/")
	homeGroup.Use()
	{
		homeGroup.GET("/", controllers.GetHomeContent)
		homeGroup.POST("/", controllers.UpdateHomeContent)
	}

	rankListGroup := r.Group("/ranklist")
	rankListGroup.Use()
	{
		rankListGroup.GET("/", controllers.GetRankList)
	}
	rankGroup := r.Group("/rank/:id")
	rankGroup.Use()
	{
		rankGroup.GET("/", controllers.GetRank)
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
		taskGroup.POST("/", controllers.UpdateTask)
		taskGroup.GET("/submit-description/", controllers.GetTaskSubmitDescription)
		taskGroup.POST("/submit-description/", controllers.UpdateTaskSubmitDescription)
	}

	submitGroup := r.Group("/submit")
	submitGroup.Use(AuthMiddleware())
	{
		submitGroup.POST("/", controllers.CreateSubmit)
	}

	recordListGroup := r.Group("/recordlist")
	recordListGroup.Use(AuthMiddleware())
	{
		recordListGroup.GET("/", controllers.GetUserRecords)
		recordListGroup.GET("/data/", controllers.GetUserRecordData)
	}

	recordGroup := r.Group("/record/:id")
	recordGroup.Use(AuthMiddleware())
	{
		recordGroup.GET("/", controllers.GetRecord)
		recordGroup.DELETE("/", controllers.DeleteRecord)
	}
}
