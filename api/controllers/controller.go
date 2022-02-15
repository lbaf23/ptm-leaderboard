package controllers

import (
	"errors"

	"github.com/casdoor/casdoor-go-sdk/auth"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

type Response struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func GetUser(c *gin.Context) (auth.Claims, error) {
	user := sessions.Default(c).Get("user")
	if user == nil {
		return auth.Claims{}, errors.New("user not found")
	} else {
		return user.(auth.Claims), nil
	}
}

func SetUser(c *gin.Context, claims *auth.Claims) error {
	session := sessions.Default(c)
	session.Set("user", claims)
	return session.Save()
}

func DeleteUser(c *gin.Context) error {
	session := sessions.Default(c)
	session.Clear()
	return session.Save()
}
