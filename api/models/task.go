package models

type Task struct {
	Id          string `json:"id" gorm:"primaryKey"`
	Title       string `json:"title"`
	Icon        string `json:"icon"`
	Description string `json:"description"`
	Type        string `json:"type" gorm:"index"`
}

func GetTaskById(id string) (task Task, err error) {
	db.Where("id = ?", id).First(&task)
	err = nil
	return
}

func GetTaskList(t string) (task []Task, err error) {
	db.Where("type = ?", t).Find(&task)
	err = nil
	return
}
