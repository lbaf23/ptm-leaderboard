from attack.sa import sa_attack
from attack.csa import csa_attack
from attack.nli import nli_attack
from attack.qqp import qqp_attack
import datetime
import logging


def start_attack(config, client, record_id, task_id, user_id, file_url, modelBasedOn, mode, hgToken):
    score = 0
    result = []
    started_at = datetime.datetime.now(datetime.timezone.utc)

    try:
        status = 'succeed'
        message = ''
        started_at = datetime.datetime.now(datetime.timezone.utc)

        if task_id == 'sa':
            score, result, started_at = sa_attack(
                config,
                client,
                record_id,
                task_id,
                user_id,
                file_url,
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
                file_url,
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
                file_url,
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
                file_url,
                modelBasedOn,
                mode,
                hgToken
            )
    except Exception as e:
        status = 'error'
        message = str(e)
    
    print("[attack] attack all finished")

    result = {
        "score": score,
        "result": result,
        "status": status,
        "message": message,
    }

    return result, started_at
