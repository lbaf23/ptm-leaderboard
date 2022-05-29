import logging
from attack import load_victim
from utils import no_ssl_verify
from nats import publish
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


def nli_attack(config, client, record_id, task_id, user_id, model_path, modelBasedOn='bert', mode='file', hgToken=''):
    dataset = datasets.load_from_disk('datasets/snli', keep_in_memory=False)

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
        attacker = oa.attackers.PWWSAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    logging.info("[attack] PWWSAttacker Finished")

    result.append({
        "attacker": "PWWSAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    logging.info("[attack] DeepWordBugAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.DeepWordBugAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    logging.info("[attack] DeepWordBugAttacker Finished")

    result.append({
        "attacker": "DeepWordBugAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    logging.info("[attack] GANAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.GANAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    logging.info("[attack] GANAttacker Finished")

    result.append({
        "attacker": "GANAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    logging.info("[attack] PSOAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.PSOAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    logging.info("[attack] PSOAttacker Finished")
    result.append({
        "attacker": "PSOAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    logging.info("[attack] HotFlipAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.HotFlipAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    logging.info("[attack] HotFlipAttacker Finished")
    result.append({
        "attacker": "HotFlipAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    score = (total - success) * 100.0 / total
    return score, result, started_at
