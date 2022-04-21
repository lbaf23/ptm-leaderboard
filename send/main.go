package main

import (
	"fmt"
	"send/conf"
	"send/event"
	"send/queue"
	"send/routers"

	"github.com/gin-gonic/gin"
)

func main() {
	conf.Init()
	gin.SetMode(conf.Config.RunMode)
	r := gin.Default()
	queue.Init()

	r.Use(routers.CorsMiddleware())
	event.Init(r)

	r.Run(fmt.Sprintf(":%s", conf.Config.HttpPort))
}
