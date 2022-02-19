package controllers

import (
	"api/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type RankListResponse struct {
	Response
	Ranks []models.Rank `json:"ranks"`
	Total int64         `json:"total"`
}

func GetRankList(c *gin.Context) {
	var (
		res      RankListResponse
		err      error
		page     int64
		pageSize int64
	)

	taskId := c.Query("taskId")
	page, err = strconv.ParseInt(c.Query("page"), 10, 32)
	if err != nil {
		pageSize = 1
	}
	pageSize, err = strconv.ParseInt(c.Query("pageSize"), 10, 32)
	if err != nil {
		pageSize = 20
	}
	res.Code = 200
	res.Total, res.Ranks = models.GetRankList(taskId, int(page), int(pageSize))
	c.JSON(http.StatusOK, &res)
}

type RankResponse struct {
	Response
	Rank models.Rank `json:"rank"`
}

func GetRank(c *gin.Context) {
}
