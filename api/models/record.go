package models

import (
	"fmt"
	"time"
)

type Record struct {
	Id          uint      `json:"id" gorm:"primary_key;column:id"`
	StartedAt   time.Time `json:"startedAt" gorm:"column:started_at"`
	FinishedAt  time.Time `json:"finishedAt" gorm:"column:finished_at"`
	RunningTime time.Time `json:"runningTime" gorm:"column:running_time"`

	TaskId string `json:"taskId" gorm:"column:task_id"`
	UserId string `json:"userId" gorm:"column:user_id"`

	Loading bool   `json:"loading" gorm:"column:loading"`
	Status  string `json:"status" gorm:"column:status"`
	Message string `json:"message" gorm:"column:message"`

	FileUrl string `json:"fileUrl" gorm:"column:file_url"`

	ModelName string  `json:"modelName" gorm:"column:model_name"`
	Result    string  `json:"result" gorm:"column:result"`
	Score     float32 `json:"score" gorm:"column:score"`
}

func (Record) TableName() string {
	return "record"
}

func GetUserRecords(userId string, taskId string, page int, pageSize int, orderBy string, orderType string) (total int64, records []Record) {
	db.Model(Record{}).
		Where("task_id = ?", taskId).
		Where("user_id = ?", userId).
		Select([]string{"id", "started_at", "finished_at", "running_time", "task_id", "user_id", "loading", "status", "file_url", "model_name", "score"}).
		Limit(pageSize).
		Offset((page - 1) * pageSize).
		Order(fmt.Sprintf("%s %s", orderBy, orderType)).
		Find(&records)
	db.
		Model(&Record{}).
		Where("task_id = ?", taskId).
		Where("user_id = ?", userId).Count(&total)
	return
}

func GetRecordById(id uint) (record Record, err error) {
	tx := db.Where("id = ?", id).Take(&record)
	err = tx.Error
	return
}
