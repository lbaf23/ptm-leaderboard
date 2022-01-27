package settings

import (
	"io/ioutil"
	"log"
	"os"
	"strings"

	"github.com/go-ini/ini"
)

type config struct {
	RunMode    string
	DBUser     string
	DBHost     string
	DBPassword string
	DBPort     string
	DBName     string
	SSLMode    string
}

var Config = &config{}

func Setup() {
	if os.Getenv("run_mode") == "release" {
		Config.RunMode = os.Getenv("run_mode")
		Config.DBUser = os.Getenv("postgres_user")
		Config.DBHost = os.Getenv("postgres_host")
		Config.DBPassword = loadSecret("ptm-leaderboard-db-password")
		Config.DBPort = os.Getenv("postgres_port")
		Config.DBName = os.Getenv("postgres_db")
		Config.SSLMode = os.Getenv("postgres_sslmode")
	} else if os.Getenv("run_mode") == "debug" {
		loadConfigFile("conf/app.dev.ini")
	} else {
		loadConfigFile("conf/app.ini")
	}
}

func loadSecret(secret string) string {
	secretfile, _ := ioutil.ReadFile("/var/openfaas/secrets/" + secret)
	password := strings.Split(string(secretfile), "\n")[0]
	return password
}

func loadConfigFile(f string) {
	var err error
	var cfg *ini.File

	cfg, err = ini.Load(f)
	if err != nil {
		log.Fatalf("setting.Setup, fail to parse '%s': %v", f, err)
	}
	err = cfg.Section("config").MapTo(Config)
	if err != nil {
		log.Fatalf("Cfg.MapTo %s err: %v", "config", err)
	}
}
