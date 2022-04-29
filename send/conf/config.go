package conf

import (
	"github.com/go-ini/ini"
	"os"
)

type config struct {
	HttpPort string
	RunMode  string
	NATSURL  string
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
	Config.NATSURL = os.Getenv("NATSURL")
}
