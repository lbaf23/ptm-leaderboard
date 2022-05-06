from attack.sa import sa_attack
from attack.csa import csa_attack
from attack.nli import nli_attack
from attack.qqp import qqp_attack

import utils

import shutil
import zipfile
import os
import time
import requests
import datetime
import logging


def unzip_file(name):
    zip_file = zipfile.ZipFile(name)
    zip_file.extractall('user_model')
    zip_file.close()
    os.rename(zip_file.filename.split('.')[0], "user_model")
    return 'user_model'


def get_file(url):
    del_all()
    if url.startswith('http'):
        r = requests.get(url=url, stream=True)
        f = open('user_model.zip', 'wb')
        for chunk in r.iter_content(chunk_size=1024):
            if chunk:
                f.write(chunk)
        f.close()
        return 'user_model.zip'
    else:
        return url


def del_all():
    if os.path.exists('user_model'):
        shutil.rmtree('user_model')
    if os.path.exists('user_model.zip'):
        os.remove('user_model.zip')


def start_attack(config, client, record_id, task_id, user_id, file_url, modelBasedOn, mode, hgToken):
    score = 0
    result = []
    started_at = datetime.datetime.now()

    try:
        if mode == 'hg':
            logging.info("[attack] use Hugging Face Model")
            model_path = file_url
            # rsa
            if hgToken != "":
                hgToken = utils.decode(hgToken)
        else:
            logging.info("[attack] download model file")
            model_path = unzip_file(get_file(file_url))
            logging.info(f"[attack] start attack {task_id} based on {modelBasedOn}")

        status = 'succeed'
        message = ''
        started_at = datetime.datetime.now()
        if task_id == 'sa':
            score, result, started_at = sa_attack(
                config,
                client,
                record_id,
                task_id,
                user_id,
                model_path,
                modelBasedOn,
                mode,
                hgToken
            )
        elif task_id == 'csa':
            score, result, started_at = csa_attack(
                config,
                client,
                record_id,
                task_id,
                user_id,
                model_path,
                modelBasedOn,
                mode,
                hgToken
            )
        elif task_id == 'nli':
            score, result, started_at = nli_attack(
                config,
                client,
                record_id,
                task_id,
                user_id,
                model_path,
                modelBasedOn,
                mode,
                hgToken
            )
        elif task_id == 'qqp':
            score, result, started_at = qqp_attack(
                config,
                client,
                record_id,
                task_id,
                user_id,
                model_path,
                modelBasedOn,
                mode,
                hgToken
            )
    except Exception as e:
        status = 'error'
        message = str(e)
    
    logging.info("[attack] attack all finished")

    result = {
        "score": score,
        "result": result,
        "status": status,
        "message": message,
    }

    return result, started_at
