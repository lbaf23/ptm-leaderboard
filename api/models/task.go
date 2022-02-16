package models

type Task struct {
	Id          string `json:"id" gorm:"primary_key" gorm:"column:id"`
	Title       string `json:"title" gorm:"column:title"`
	Description string `json:"description" gorm:"column:description"`
	Type        string `json:"type" gorm:"index" gorm:"column:type"`

	Content string `json:"content" gorm:"column:content"`
}

func (Task) TableName() string {
	return "task"
}

func GetTaskById(id string) (task Task) {
	db.Where("id = ?", id).First(&task)
	return
}

func GetTaskList(t string) (task []Task) {
	db.Where("type = ?", t).
		Select([]string{"id", "title", "description", "type"}).
		Find(&task)
	return
}
