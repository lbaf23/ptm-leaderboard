from attack.sa import sa_attack
import shutil
import zipfile
import os
import time
import requests


def unzip_file(name):
    zip_file = zipfile.ZipFile(name)
    zip_file.extractall('user_model')
    zip_file.close()
    os.rename(zip_file.filename.split('.')[0], "user_model")
    return 'user_model'


def get_file(url):
    del_all()
    if(url.startswith('http')):
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
    if(os.path.exists('user_model')):
        shutil.rmtree('user_model')
    if(os.path.exists('user_model.zip')):
        os.remove('user_model.zip')



def start_attack(config, task_id, file_url):
    score = 0
    result = {}

    print("-->attacking")

    model_path = unzip_file(get_file(file_url))
    if(task_id == 'sa'):
        score, result = sa_attack(config, model_path)
    
    print("-->score: %s" % score)

    result = {
        "score": score,
        "result": result,
        "status": "succeed",
        "message": "ok",
    }

    return result


def fake_attack():
    print("-->fake attacking")
    time.sleep(10)
    return {
        "score": 25,
        "result": [
            {
                "attacker": "PWWSAttacker",
                "result": {
                    "Total Attacked Instances": 20,
                    "Successful Instances": 14,
                    "Attack Success Rate": 0.7,
                    "Avg. Running Time": 0.022733259201049804,
                    "Total Query Exceeded": 0,
                    "Avg. Victim Model Queries": 178.2
                }
            },
            {
                "attacker": "TextBuggerAttacker",
                "result": {
                    "Total Attacked Instances": 20,
                    "Successful Instances": 15,
                    "Attack Success Rate": 0.75,
                    "Avg. Running Time": 0.0022499561309814453,
                    "Total Query Exceeded": 0,
                    "Avg. Victim Model Queries": 45.8
                },
            },
            {
                "attacker": "SCPNAttacker",
                "result": {
                    "Total Attacked Instances": 20,
                    "Successful Instances": 16,
                    "Attack Success Rate": 0.8,
                    "Avg. Running Time": 0.0022499561309814453,
                    "Total Query Exceeded": 0,
                    "Avg. Victim Model Queries": 45.8
                }
            }
        ],
        "status": "succeed",
        "message": "msg",
    }