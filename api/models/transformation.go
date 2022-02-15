package models

type Transformation struct {
	ID           string `json:"id" gorm:"primary_key;column:id"`
	DataSetRefer string `gorm:"primary_key;column:data_set_refer"`

	Title string `json:"title" gorm:"column:title"`
	Url   string `json:"url" gorm:"column:url"`
}

func (Transformation) TableName() string {
	return "transformation"
}
