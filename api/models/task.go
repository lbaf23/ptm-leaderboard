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

func GetTaskById(id string) (task Task, err error) {
	tx := db.Where("id = ?", id).First(&task)
	err = tx.Error
	return
}

func GetTaskList(t string) (task []Task, err error) {
	tx := db.Where("type = ?", t).
		Select([]string{"id", "title", "description", "type"}).
		Find(&task)
	err = tx.Error
	return
}

func UpdateTask(task Task) (err error) {
	tx := db.Model(Task{}).Updates(task)
	err = tx.Error
	return
}

func UpdateTaskContent(id string, content string) (err error) {
	tx := db.
		Model(Task{}).
		Where("id = ?", id).
		Update("content", content)
	err = tx.Error
	return
}
