package routers

import (
	"net/http"

	"github.com/casdoor/casdoor-go-sdk/auth"
	"github.com/gin-gonic/gin"
)

func CorsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")
		if origin != "" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
			c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, UPDATE")
			c.Header("Access-Control-Allow-Credentials", "true")
		}
		if method == "OPTIONS" {
			c.JSON(http.StatusOK, "ok")
		}
		c.Next()
	}
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		if method == "OPTIONS" {
			c.JSON(http.StatusOK, "ok")
			c.Next()
		}

		token := c.Query("token")
		claims, err := auth.ParseJwtToken(token)
		if err != nil {
			c.Abort()
			c.JSON(http.StatusOK, gin.H{"code": 403, "message": "please login first"})
		} else {
			c.Set("userId", claims.Id)
			c.Next()
		}
	}
}
