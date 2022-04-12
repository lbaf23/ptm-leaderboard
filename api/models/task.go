package models

type Task struct {
	Id          string `json:"id" gorm:"primary_key;column:id"`
	Title       string `json:"title" gorm:"column:title"`
	Description string `json:"description" gorm:"column:description"`
	Type        string `json:"type" gorm:"index;column:type"`
	Num         uint   `json:"num" gorm:"index;column:num"`

	Content           string `json:"content" gorm:"column:content"`
	SubmitDescription string `json:"submitDescription" gorm:"column:submit_description"`
}

func (Task) TableName() string {
	return "task"
}

func GetTaskById(id string) (task Task, err error) {
	tx := db.Model(&Task{}).
		Where("id = ?", id).
		Select([]string{"id", "title", "description", "type", "num", "content"}).
		First(&task)
	err = tx.Error
	return
}

func GetTaskSubmitDescriptionById(id string) (content string, err error) {
	tx := db.Model(&Task{}).
		Where("id = ?", id).
		Select([]string{"submit_description"}).
		First(&content)
	err = tx.Error
	return
}

func GetTaskList(t string) (task []Task, err error) {
	tx := db.Model(&Task{}).
		Where("type = ?", t).
		Select([]string{"id", "title", "description", "type"}).
		Order("num asc").
		Find(&task)
	err = tx.Error
	return
}

func UpdateTask(task Task) (err error) {
	tx := db.Model(Task{}).Updates(&task)
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

func UpdateTaskSubmitContent(id string, content string) (err error) {
	tx := db.
		Model(Task{}).
		Where("id = ?", id).
		Update("submit_description", content)
	err = tx.Error
	return
}
