package models

import (
	"gorm.io/gorm"
)

type Record struct {
	gorm.Model

	TaskId string `json:"taskId" gorm:"column:task_id"`
	UserId string `json:"userId" gorm:"column:user_id"`
}

func (Record) TableName() string {
	return "record"
}
