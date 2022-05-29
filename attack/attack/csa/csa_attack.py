import logging
from attack import load_victim
from utils import no_ssl_verify
from queue import publish
import OpenAttack as oa
import datasets
import datetime
import json


class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%dT%H:%M:%SZ")
        else:
            return json.JSONEncoder.default(self, obj)


def csa_attack(config, client, record_id, task_id, user_id, model_path, modelBasedOn, mode='file', hgToken=''):
    dataset = datasets.load_from_disk('datasets/ChnSentiCorp', keep_in_memory=False)

    victim = load_victim(
        mode=mode,
        model_path=model_path,
        hgToken=hgToken,
        modelBasedOn=modelBasedOn
    )

    logging.info("[attack] model loaded")
    started_at = datetime.datetime.now(datetime.timezone.utc)
    data = {
        "recordId": record_id,
        "startedAt": started_at,
        "taskId": task_id,
        "userId": user_id,
        "status": "running",
    }
    res = json.dumps(data, cls=DateEncoder).encode()

    publish(client, subject="startAttack", payload=res)

    result = []
    success = 0
    total = 0

    logging.info("[attack] PWWSAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.PWWSAttacker(lang="chinese")
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    logging.info("[attack] PWWSAttacker Finished")
    result.append({
        "attacker": "PWWSAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    logging.info("[attack] HotFlipAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.HotFlipAttacker(lang="chinese")
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    logging.info("[attack] HotFlipAttacker Finished")
    result.append({
        "attacker": "HotFlipAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    logging.info("[attack] PSOAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.PSOAttacker(lang="chinese")
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    logging.info("[attack] PSOAttacker Finished")
    result.append({
        "attacker": "PSOAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    logging.info("[attack] UATAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.UATAttacker(lang="chinese")
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    logging.info("[attack] UATAttacker Finished")
    result.append({
        "attacker": "UATAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    score = (total - success) * 100.0 / total
    return score, result, started_at
