package conf

import (
	"github.com/go-ini/ini"
	"os"
)

type config struct {
	RunMode     string
	HttpPort    string
	LocalServer string

	CasdoorEndpoint     string
	CasdoorClientId     string
	CasdoorClientSecret string
	CasdoorOrganization string
	ApplicationName     string

	OSS     string
	OSSHost string

	Region          string
	AccessKeyId     string
	AccessKeySecret string
	RoleArn         string
	RoleSessionName string

	Bucket string
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
	Config.LocalServer = os.Getenv("LocalServer")

	Config.Region = os.Getenv("Region")
	Config.AccessKeyId = os.Getenv("AccessKeyId")
	Config.AccessKeySecret = os.Getenv("AccessKeySecret")
	Config.RoleArn = os.Getenv("RoleArn")
	Config.RoleSessionName = os.Getenv("RoleSessionName")
	Config.Bucket = os.Getenv("Bucket")

	Config.CasdoorEndpoint = os.Getenv("CasdoorEndpoint")
	Config.CasdoorClientId = os.Getenv("CasdoorClientId")
	Config.CasdoorClientSecret = os.Getenv("CasdoorClientSecret")
	Config.CasdoorOrganization = os.Getenv("CasdoorOrganization")
	Config.ApplicationName = os.Getenv("ApplicationName")
}
