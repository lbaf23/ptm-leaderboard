package controllers

import (
	"filestorage/conf"
	"filestorage/oss"
	"github.com/gin-gonic/gin"
)

type STSResponse struct {
	Response
	AccessKeyId     string `json:"accessKeyId"`
	AccessKeySecret string `json:"accessKeySecret"`
	SecurityToken   string `json:"securityToken"`
	Bucket          string `json:"bucket"`
}

func GetSTS(c *gin.Context) {
	var res STSResponse
	res.Code = 200
	sts := oss.GetSTS()
	res.Bucket = conf.Config.Bucket
	res.AccessKeyId = sts.Credentials.AccessKeyId
	res.AccessKeySecret = sts.Credentials.AccessKeySecret
	res.SecurityToken = sts.Credentials.SecurityToken
	c.JSON(200, res)
}
