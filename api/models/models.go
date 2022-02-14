package models

import (
	"api/conf"
	"database/sql"
	"fmt"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB
var SQLDB *sql.DB

type Model struct {
	ID         int `gorm:"primary_key" json:"id"`
	CreatedOn  int `json:"created_on"`
	ModifiedOn int `json:"modified_on"`
	DeletedOn  int `json:"deleted_on"`
}

func Init() {
	var err error

	connStr := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		conf.Config.DBHost,
		conf.Config.DBUser,
		conf.Config.DBPassword,
		conf.Config.DBName,
		conf.Config.DBPort,
		conf.Config.SSLMode,
		conf.Config.TimeZone,
	)

	db, err = gorm.Open(postgres.Open(connStr))

	if err != nil {
		panic(err)
	}
	SQLDB, err = db.DB()
	if err != nil {
		panic(err)
	}
	SQLDB.SetConnMaxLifetime(time.Hour)
	SQLDB.SetMaxIdleConns(5)
	SQLDB.SetMaxOpenConns(100)
}
