package main

import (
	"api/conf"
	"api/controllers"
	"api/models"
	"api/routers"
	"encoding/gob"
	"fmt"

	"github.com/casdoor/casdoor-go-sdk/auth"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/postgres"
	"github.com/gin-gonic/gin"
)

func main() {
	conf.Init()
	gin.SetMode(conf.Config.RunMode)
	r := gin.Default()
	models.Init()

	gob.Register(auth.Claims{})

	store, err := postgres.NewStore(models.SQLDB, []byte("secret"))
	if err != nil {
		panic(err)
	}
	r.Use(sessions.Sessions("ptm-leaderboard", store))

	r.Use(routers.CorsMiddleware())

	routers.Init(r)
	controllers.InitCasdoor()

	server := fmt.Sprintf(":%s", conf.Config.HttpPort)
	r.Run(server)
}
