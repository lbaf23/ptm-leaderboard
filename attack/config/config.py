import os
import configparser

config = configparser.ConfigParser()

def init_config():
    run_mode = os.getenv("run_mode")
    if run_mode == "release":
        if not load_config("config/app.release.ini"):
            load_config("config/app.ini")
    else:
        if not load_config("config/app.debug.ini"):
            load_config("config/app.ini")

def load_config(file):
    config.read(file)
    return True
