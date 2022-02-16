package models

import "github.com/lib/pq"

type Trans struct {
	Id        string `json:"id" gorm:"primary_key;column:id"`
	TaskRefer string `json:"taskRefer" gorm:"primary_key;column:task_refer"`

	Title       string         `json:"title" gorm:"column:title"`
	RankColumns pq.StringArray `json:"rankColumns" gorm:"type:text[];column:rank_columns"`

	DataSets []DataSet `json:"dataSets" gorm:"foreign_key:"`
}

func (Trans) TableName() string {
	return "trans"
}
