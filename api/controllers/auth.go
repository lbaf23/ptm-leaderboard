package controllers

import (
	"api/conf"
	_ "embed"
	"net/http"

	"github.com/casdoor/casdoor-go-sdk/auth"
	"github.com/gin-contrib/sessions"
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

	// claims.AccessToken = token.AccessToken

	session := sessions.Default(c)
	session.Set("user", claims)
	err = session.Save()

	if err != nil {
		res.Code = 403
		res.Message = err.Error()
		c.JSON(http.StatusOK, res)
		return
	}

	res.Code = 200
	res.Message = "login succeed"
	res.Data = claims

	c.JSON(http.StatusOK, res)
}

func Logout(c *gin.Context) {
	var res Response
	session := sessions.Default(c)

	session.Clear()
	err := session.Save()

	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}

	res.Code = 200
	res.Message = "logout"
	c.JSON(http.StatusOK, &res)
}

func GetAccount(c *gin.Context) {
	var res Response
	session := sessions.Default(c)

	user := session.Get("user")

	if user == nil {
		res.Code = 404
		res.Message = "can't find the account"
		c.JSON(http.StatusOK, &res)
		return
	}
	res.Code = 200
	res.Data = user
	c.JSON(http.StatusOK, &res)
}
