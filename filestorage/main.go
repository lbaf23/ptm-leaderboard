package main

import (
	"filestorage/conf"
	"filestorage/routers"
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
	conf.Init()
	gin.SetMode(conf.Config.RunMode)
	r := gin.Default()
	r.Use(routers.CorsMiddleware())
	routers.Init(r)
	r.Run(fmt.Sprintf(":%s", conf.Config.HttpPort))
}
