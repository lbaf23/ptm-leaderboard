package models

type Rank struct {
	TaskId string `json:"taskId" gorm:"primary_key;column:task_id"`
	UserId string `json:"userId" gorm:"primary_key;column:user_id"`

	UserName  string `json:"userName" gorm:"column:user_name"`
	ModelName string `json:"modelName" gorm:"column:model_name"`

	Score  float32 `json:"score" gorm:"column:score"`
	Result string  `json:"result" gorm:"column:result"`
}

func (Rank) TableName() string {
	return "rank"
}

func GetRankList(taskId string, page int, pageSize int) (total int64, ranks []Rank) {
	db.
		Where("task_id = ?", taskId).
		Order("score desc").
		Limit(pageSize).
		Offset((page - 1) * pageSize).
		Find(&ranks)
	db.
		Model(Rank{}).
		Where("task_id = ?", taskId).
		Count(&total)
	return
}
