package models

type File struct {
	FileName    string `json:"fileName" gorm:"not null;column:file_name"`
	FileUrl     string `json:"fileUrl" gorm:"not null;column:file_url"`
	FileType    string `json:"fileType" gorm:"not null;column:file_type"`
	StorageType string `json:"storageType" gorm:"not null;column:storage_type"`
}
