package conf

import (
	"github.com/go-ini/ini"
	"os"
)

type config struct {
	RunMode    string
	HttpPort   string
	DBUser     string
	DBHost     string
	DBPassword string
	DBPort     string
	DBName     string
	SSLMode    string
	TimeZone   string

	CasdoorEndpoint     string
	CasdoorClientId     string
	CasdoorClientSecret string
	CasdoorOrganization string
	ApplicationName     string

	NATSURL string
}

var Config = &config{}

func Init() {
	if os.Getenv("RunMode") == "release" {
		err := loadConfigFile("conf/app.release.ini")
		if err != nil {
			loadConfigFile("conf/app.ini")
		}
		loadK8SSecret()
	} else {
		err := loadConfigFile("conf/app.debug.ini")
		if err != nil {
			loadConfigFile("conf/app.ini")
		}
	}
}

func loadConfigFile(f string) error {
	var err error
	var cfg *ini.File
	cfg, err = ini.Load(f)
	if err != nil {
		return err
	}
	err = cfg.Section("config").MapTo(Config)
	if err != nil {
		return err
	}
	return nil
}

func loadK8SSecret() {
	Config.DBHost = os.Getenv("DBHost")
	Config.DBUser = os.Getenv("DBUser")
	Config.DBPassword = os.Getenv("DBPassword")
	Config.DBPort = os.Getenv("DBPort")
	Config.DBName = os.Getenv("DBName")

	Config.CasdoorEndpoint = os.Getenv("CasdoorEndpoint")
	Config.CasdoorClientId = os.Getenv("CasdoorClientId")
	Config.CasdoorClientSecret = os.Getenv("CasdoorClientSecret")
	Config.CasdoorOrganization = os.Getenv("CasdoorOrganization")
	Config.ApplicationName = os.Getenv("ApplicationName")

	Config.NATSURL = os.Getenv("NATSURL")
}
