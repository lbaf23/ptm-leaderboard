package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetRecord(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{"msg": "ok"})
}

func CreateRecord(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{"msg": "ok"})
}

func DeleteRecord(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{"msg": "ok"})
}
