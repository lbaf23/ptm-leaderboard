package controllers

import (
	"api/models"
	"fmt"
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
	user, err := GetUser(c)
	if err != nil {
		res.Code = 404
		res.Message = err.Error()
	} else {
		taskId := c.Query("taskId")
		page, err := strconv.ParseInt(c.Query("page"), 10, 32)
		pageSize, err := strconv.ParseInt(c.Query("pageSize"), 10, 32)
		if err != nil {
			res.Code = 500
			res.Message = err.Error()
		} else {
			res.Code = 200
			fmt.Println(page, pageSize)
			res.Total, res.Records = models.GetUserRecords(user.Id, taskId, int(page), int(pageSize))
		}
	}
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
	} else {
		res.Code = 200
		res.Record = models.GetRecordById(uint(id))
	}
	c.JSON(http.StatusOK, &res)
}

func CreateRecord(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{"msg": "ok"})
}

func DeleteRecord(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{"msg": "ok"})
}
