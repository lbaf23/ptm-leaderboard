import os
import configparser


def init_config():
    config = configparser.ConfigParser()
    run_mode = os.getenv("run_mode")
    if run_mode == "release":
        if not load_config(config, "conf/app.release.ini"):
            load_config(config, "conf/app.ini")
    else:
        if not load_config(config, "conf/app.debug.ini"):
            load_config(config, "conf/app.ini")

    return config


def load_config(config, file):
    config.read(file)
    return True
