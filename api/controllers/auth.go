package controllers

import (
	"api/conf"
	_ "embed"
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

type UserResponse struct {
	Response
	Account auth.Claims `json:"account"`
}

func Login(c *gin.Context) {
	var res UserResponse
	code := c.PostForm("code")
	state := c.PostForm("state")

	token, err := auth.GetOAuthToken(code, state)
	if err != nil {
		res.Code = 403
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	claims, err := auth.ParseJwtToken(token.AccessToken)
	if err != nil {
		res.Code = 403
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}

	claims.AccessToken = token.AccessToken

	if err != nil {
		res.Code = 403
		res.Message = err.Error()
		c.JSON(http.StatusOK, res)
		return
	}
	res.Code = 200
	res.Message = "login succeed"
	res.Account = *claims
	c.JSON(http.StatusOK, res)
}

func Logout(c *gin.Context) {
	var res Response
	res.Code = 200
	res.Message = "logout"
	c.JSON(http.StatusOK, &res)
}

func GetAccount(c *gin.Context) {
	var res UserResponse
	claims, err := auth.ParseJwtToken(c.Query("token"))
	if err != nil {
		res.Code = 404
		res.Message = err.Error()
	} else {
		res.Code = 200
		res.Account = *claims
	}
	c.JSON(http.StatusOK, &res)
}
