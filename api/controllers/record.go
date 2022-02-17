package controllers

import (
	"api/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type RecordListResponse struct {
	Response
	Records []models.Record `json:"records"`
	Total   int64           `json:"total"`
}

func GetUserRecords(c *gin.Context) {
	var (
		res RecordListResponse
	)

	userId := c.GetString("userId")

	taskId := c.Query("taskId")
	orderBy := c.Query("orderBy")
	orderType := c.Query("orderType")
	page, err := strconv.ParseInt(c.Query("page"), 10, 32)
	pageSize, err := strconv.ParseInt(c.Query("pageSize"), 10, 32)
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	res.Code = 200
	res.Total, res.Records = models.GetUserRecords(userId, taskId, int(page), int(pageSize), orderBy, orderType)
	c.JSON(http.StatusOK, &res)
}

type RecordResponse struct {
	Response
	Record models.Record `json:"record"`
}

func GetRecord(c *gin.Context) {
	var (
		res RecordResponse
		err error
	)

	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	res.Record, err = models.GetRecordById(uint(id))
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	res.Code = 200
	c.JSON(http.StatusOK, &res)
}

func CreateRecord(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{"msg": "ok"})
}

func DeleteRecord(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{"msg": "ok"})
}
