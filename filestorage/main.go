package main

import (
	"filestorage/conf"
	"filestorage/controllers"
	"filestorage/oss"
	"filestorage/routers"
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
	conf.Init()
	gin.SetMode(conf.Config.RunMode)
	r := gin.Default()

	if conf.Config.OSS == "on" {
		oss.Init()
	}

	r.Use(routers.CorsMiddleware())
	controllers.InitCasdoor()
	routers.Init(r)
	r.Run(fmt.Sprintf(":%s", conf.Config.HttpPort))
}
