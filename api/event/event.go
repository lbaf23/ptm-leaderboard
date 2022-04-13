package event

import (
	"fmt"
	"github.com/alexandrevicenzi/go-sse"
	"github.com/gin-gonic/gin"
)

var s *sse.Server

func Init(r *gin.Engine) {
	s = sse.NewServer(nil)
	r.GET("/events/:channel", func(c *gin.Context) {
		s.ServeHTTP(c.Writer, c.Request)
	})
}

func Send(path string, msg string) {
	s.SendMessage(fmt.Sprintf("/events/%s", path), sse.SimpleMessage(msg))
}
