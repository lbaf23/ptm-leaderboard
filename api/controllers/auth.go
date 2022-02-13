package controllers

import (
	"api/conf"
	_ "embed"
	"fmt"
	"net/http"

	"github.com/casdoor/casdoor-go-sdk/auth"
	"github.com/gin-gonic/gin"
)

func InitCasdoor() {
	casdoorEndpoint := conf.Config.CasdoorEndpoint
	clientId := conf.Config.CasdoorClientId
	clientSecret := conf.Config.CasdoorClientSecret
	casdoorOrganization := conf.Config.CasdoorOrganization
	applicationName := conf.Config.ApplicationName
	auth.InitConfig(casdoorEndpoint, clientId, clientSecret, JwtPublicKey, casdoorOrganization, applicationName)
}

//go:embed token_jwt_key.pem
var JwtPublicKey string

func Login(c *gin.Context) {
	var res Response
	code := c.PostForm("code")
	state := c.PostForm("state")

	fmt.Println(code, state)

	token, err := auth.GetOAuthToken(code, state)
	if err != nil {
		fmt.Println(err)

		res.Code = 403
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	claims, err := auth.ParseJwtToken(token.AccessToken)
	if err != nil {
		fmt.Println(err)
		res.Code = 403
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}

	claims.AccessToken = token.AccessToken
	// c.setSessionUser(claims)
	res.Code = 200
	res.Message = "login succeed"
	res.Data = claims

	c.JSON(http.StatusOK, res)
}

func Logout(c *gin.Context) {
	var res Response
	// c.setSessionUser(nil)
	res.Code = 200
	res.Message = "logout"
	c.JSON(http.StatusOK, &res)
}
