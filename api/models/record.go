package models

import (
	"gorm.io/gorm"
)

type Record struct {
	gorm.Model

	RecordID int `json:"record_id" gorm:"index"`
}
