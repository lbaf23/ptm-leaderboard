package models

import (
	"fmt"
	"time"
)

type Record struct {
	Id uint `json:"id" gorm:"primary_key;AUTO_INCREMENT;not null;column:id"`

	SubmittedAt time.Time `json:"submittedAt" gorm:"column:submitted_at"`
	StartedAt   time.Time `json:"startedAt" gorm:"column:started_at"`
	FinishedAt  time.Time `json:"finishedAt" gorm:"column:finished_at"`
	RunningTime uint      `json:"runningTime" gorm:"column:running_time"`

	TaskId string `json:"taskId" gorm:"index;column:task_id"`
	UserId string `json:"userId" gorm:"index;column:user_id"`

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
		Select([]string{"id", "submitted_at", "started_at", "finished_at", "running_time", "task_id", "user_id", "status", "file_url", "model_name", "score"}).
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

func GetUserRecordData(userId string, taskId string) (data []float32) {
	db.Model(Record{}).
		Where("task_id = ?", taskId).
		Where("user_id = ?", userId).
		Where("status = 'succeed'").
		Select([]string{"score"}).
		Order("submitted_at asc").
		Find(&data)
	return
}

func GetRecordById(id uint) (record Record, err error) {
	tx := db.Where("id = ?", id).Take(&record)
	err = tx.Error
	return
}

func CreateRecord(record Record) (id uint, err error) {
	tx := db.Create(&record)
	err = tx.Error
	id = record.Id
	return
}
