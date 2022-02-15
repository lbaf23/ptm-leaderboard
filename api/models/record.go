package models

import (
	"time"
)

type Record struct {
	Id        uint      `json:"id" gorm:"primary_key;column:id"`
	CreatedAt time.Time `json:"createdAt" gorm:"column:created_at"`
	TaskId    string    `json:"taskId" gorm:"column:task_id"`
	UserId    string    `json:"userId" gorm:"column:user_id"`
	Loading   bool      `json:"loading" gorm:"column:loading"`
}

func (Record) TableName() string {
	return "record"
}

func GetUserRecords(userId string, taskId string, page int, pageSize int) (total int64, records []Record) {
	db.Where("task_id = ?", taskId).
		Where("user_id = ?", userId).
		Limit(pageSize).
		Offset(page * pageSize).
		Order("created_at desc").
		Find(&records)
	db.
		Model(&Record{}).
		Where("task_id = ?", taskId).
		Where("user_id = ?", userId).Count(&total)
	return
}

func GetRecordById(id uint) (record Record) {
	db.Where("id = ?", id).First(&record)
	return
}

func CreateRecord(record Record) (row int64, err error) {
	result := db.Create(record)
	row = result.RowsAffected
	err = result.Error
	return
}
