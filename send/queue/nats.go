package queue

import (
	"encoding/json"
	"fmt"
	"send/conf"
	"send/event"
	"time"

	"github.com/nats-io/nats.go"
)

var nc *nats.Conn

func Init() {
	var err error
	nc, err = nats.Connect(conf.Config.NATSURL)
	if err != nil {
		panic(err.Error())
	}
	_, err = nc.QueueSubscribe("startAttack", "send", handleStart)
	if err != nil {
		panic(err.Error())
	}
	_, err = nc.QueueSubscribe("loadAttack", "send", handleLoad)
	if err != nil {
		panic(err.Error())
	}
	_, err = nc.QueueSubscribe("finishAttack", "send", handleFinished)
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
	event.Send(fmt.Sprintf("%s-%s", res.TaskId, res.UserId), "loading")
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
	event.Send(fmt.Sprintf("%s-%s", res.TaskId, res.UserId), "running")
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

	if res.Status == "succeed" {

	}
	event.Send(fmt.Sprintf("%s-%s", res.TaskId, res.UserId), res.Status)
}
