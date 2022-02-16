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
	Count int64         `json:"count"`
}

func GetRankList(c *gin.Context) {
	var res RankListResponse

	taskId := c.Query("taskId")
	page, err := strconv.ParseInt(c.Query("page"), 10, 32)
	pageSize, err := strconv.ParseInt(c.Query("pageSize"), 10, 32)
	if err != nil {
		res.Code = 500
		res.Message = err.Error()
		c.JSON(http.StatusOK, &res)
		return
	}
	res.Code = 200
	res.Count, res.Ranks = models.GetRankList(taskId, int(page), int(pageSize))
	c.JSON(http.StatusOK, &res)
}

type RankResponse struct {
	Response
	Rank models.Rank `json:"rank"`
}

func GetRank(c *gin.Context) {
}
