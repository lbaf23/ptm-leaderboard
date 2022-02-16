package models

type DataSet struct {
	ID          string `json:"id" gorm:"primary_key;column:id"`
	Title       string `json:"title" gorm:"column:title"`
	Description string `json:"description" gorm:"column:description"`
	TransRefer  string `json:"taskRefer" gorm:"column:task_refer"`
}

func (DataSet) TableName() string {
	return "data_set"
}

func GetDataSet(id string) (dataset DataSet) {
	db.Where("id = ?", id).Find(&dataset)
	return
}

func GetTaskDataSets(taskId string) (datasets []DataSet) {
	db.
		Where("task_refer = ?", taskId).
		Preload("Transformations").
		Find(&datasets)
	return
}
