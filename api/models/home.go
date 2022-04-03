package models

import "gorm.io/gorm"

type Home struct {
	Id      uint   `json:"id" gorm:"primary_key;AUTO_INCREMENT;not null;column:id"`
	Content string `json:"content" gorm:"column:content"`
}

func (Home) TableName() string {
	return "home"
}

func GetHomeContent() (content string) {
	db.
		Model(&Home{}).
		Select([]string{"content"}).
		First(&content)
	return
}

func UpdateHomeContent(content string) (err error) {
	var (
		h  Home
		tx *gorm.DB
	)
	tx = db.Model(&Home{}).First(&h)
	if tx.Error != nil {
		tx = db.Model(&Home{}).Create(Home{
			Content: content,
		})
	} else {
		tx = db.Model(&h).Update("content", content)
	}
	err = tx.Error
	return
}
