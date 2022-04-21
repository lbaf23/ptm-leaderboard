package queue

import (
	"api/conf"
	"api/models"
	"encoding/json"
	"github.com/nats-io/nats.go"
	"time"
)

var nc *nats.Conn

func Init() {
	var err error
	nc, err = nats.Connect(conf.Config.NATSURL)
	if err != nil {
		panic(err.Error())
	}
	_, err = nc.QueueSubscribe("startAttack", "api", handleStart)
	if err != nil {
		panic(err.Error())
	}
	_, err = nc.QueueSubscribe("loadAttack", "api", handleLoad)
	if err != nil {
		panic(err.Error())
	}
	_, err = nc.QueueSubscribe("finishAttack", "api", handleFinished)
	if err != nil {
		panic(err.Error())
	}
}

func Publish(b []byte) (err error) {
	err = nc.Publish("attack", b)
	return
}

type LoadResponse struct {
	RecordId uint   `json:"recordId"`
	TaskId   string `json:"taskId"`
	UserId   string `json:"userId"`
	Status   string `json:"status"`
}

func handleLoad(m *nats.Msg) {
	var res LoadResponse
	json.Unmarshal(m.Data, &res)
	r := models.Record{
		Id:     res.RecordId,
		Status: res.Status,
	}
	models.UpdateRecord(r)
}

type StartResponse struct {
	RecordId  uint      `json:"recordId"`
	StartedAt time.Time `json:"startedAt"`
	TaskId    string    `json:"taskId"`
	UserId    string    `json:"userId"`
	Status    string    `json:"status"`
}

func handleStart(m *nats.Msg) {
	var res StartResponse
	json.Unmarshal(m.Data, &res)
	r := models.Record{
		Id:        res.RecordId,
		StartedAt: res.StartedAt,
		Status:    res.Status,
	}
	models.UpdateRecord(r)
}

type FinishedResponse struct {
	RecordId    uint      `json:"recordId"`
	TaskId      string    `json:"taskId"`
	UserId      string    `json:"userId"`
	UserName    string    `json:"userName"`
	FinishedAt  time.Time `json:"finishedAt"`
	RunningTime uint      `json:"runningTime"`

	Score  float32 `json:"score"`
	Result string  `json:"result"`
	Status string  `json:"status"`

	ModelName string `json:"modelName"`
	Message   string `json:"message"`
}

func handleFinished(m *nats.Msg) {
	var res FinishedResponse
	json.Unmarshal(m.Data, &res)

	r := models.Record{
		Id:          res.RecordId,
		FinishedAt:  res.FinishedAt,
		RunningTime: res.RunningTime,
		Status:      res.Status,
		Message:     res.Message,
		Result:      res.Result,
		Score:       res.Score,
	}

	models.UpdateRecord(r)

	if res.Status == "succeed" {
		rank, err := models.GetUserRank(res.UserId, res.TaskId)
		if err != nil {
			rank = models.Rank{
				TaskId:    res.TaskId,
				UserId:    res.UserId,
				UserName:  res.UserName,
				ModelName: res.ModelName,
				Score:     res.Score,
				Result:    res.Result,
			}
			models.CreateRank(rank)
		} else {
			rank = models.Rank{
				TaskId:    rank.TaskId,
				UserId:    rank.UserId,
				UserName:  res.UserName,
				ModelName: res.ModelName,
				Score:     res.Score,
				Result:    res.Result,
			}
			models.UpdateRank(rank)
		}
	}
}
