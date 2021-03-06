package routers

import (
	"filestorage/controllers"

	"github.com/gin-gonic/gin"
)

func Init(r *gin.Engine) {
	fileGroup := r.Group("/file")
	{
		fileGroup.POST("/", controllers.UploadFile)
		fileGroup.GET("/", controllers.GetFile)
		fileGroup.DELETE("/", controllers.DeleteFile)
	}

	ossGroup := r.Group("/oss")
	ossGroup.Use(AuthMiddleware())
	{
		ossGroup.GET("/sts/", controllers.GetSTS)
	}
}
