package conf

import (
	"io/ioutil"
	"os"
	"strings"

	"github.com/go-ini/ini"
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
	} else {
		err := loadConfigFile("conf/app.debug.ini")
		if err != nil {
			loadConfigFile("conf/app.ini")
		}
	}
}

func loadSecret(secret string) string {
	secretfile, _ := ioutil.ReadFile("/var/openfaas/secrets/" + secret)
	password := strings.Split(string(secretfile), "\n")[0]
	return password
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
