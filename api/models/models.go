package models

import (
	"api/settings"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

type Model struct {
	ID         int `gorm:"primary_key" json:"id"`
	CreatedOn  int `json:"created_on"`
	ModifiedOn int `json:"modified_on"`
	DeletedOn  int `json:"deleted_on"`
}

// Setup initializes the database instance
func Setup() {
	var err error

	connStr := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=Asia/ShangHai",
		settings.Config.Host,
		settings.Config.User,
		settings.Config.Password,
		settings.Config.DBName,
		settings.Config.Port,
		settings.Config.SSLMode)

	db, err = gorm.Open(postgres.Open(connStr))

	if err != nil {
		log.Fatalf("models.Setup err: %v", err)
	}
	innerDB, err := db.DB()
	if err != nil {
		panic(err)
	}
	innerDB.SetConnMaxLifetime(7200)
	innerDB.SetMaxIdleConns(5)
	innerDB.SetMaxOpenConns(50)

}
