package models

type Task struct {
	ID          string `json:"id" gorm:"primary_key" gorm:"column:id"`
	Title       string `json:"title" gorm:"column:title"`
	Description string `json:"description" gorm:"column:description"`
	Type        string `json:"type" gorm:"index" gorm:"column:type"`
}

func (Task) TableName() string {
	return "task"
}

func GetTaskById(id string) (task Task) {
	db.Where("id = ?", id).First(&task)
	return
}

func GetTaskList(t string) (task []Task) {
	db.Where("type = ?", t).Find(&task)
	return
}
