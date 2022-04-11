import json
import time
import random


def start_attack(config, task_id, file_url):
    time.sleep(1)

    # TODO generate attack score and result    file_url

    result = [
        {'trans': 'SwapSpecialEnt-Movie', 'score': 90},
        {'trans': 'SwapSpecialEnt-Person', 'score': 90},
        {'trans': 'AddSum-Movie', 'score': 90},
        {'trans': 'AddSum-Person', 'score': 90},
        {'trans': 'DoubleDenial', 'score': 90},
    ]
    score = 90

    print("score: %s" % score)

    result = {
        "score": score,
        "result": result,
        "status": "succeed",
        "message": "msgggg",
    }

    return result

