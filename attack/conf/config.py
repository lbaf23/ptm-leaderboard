import os
import configparser
import logging


def init_config():
    logging.basicConfig(
        level=logging.DEBUG,
        filename="attack.log",
        filemode="w",
        format="%(asctime)s - %(name)s - %(levelname)-9s - %(filename)-8s : %(lineno)s line - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )

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
