import OpenAttack as oa
import datasets
from attack.loader import load_victim
from utils import no_ssl_verify
from nats import publish
import datetime
import json
import logging


class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%dT%H:%M:%SZ")
        else:
            return json.JSONEncoder.default(self, obj)


def sa_attack(
        config,
        client,
        record_id,
        task_id,
        user_id,
        file_url,
        modelBasedOn='bert',
        mode='file',
        hgToken=''
    ):
    dataset = datasets.load_from_disk('datasets/sst', keep_in_memory=False)

    victim = load_victim(
        mode=mode,
        file_url=file_url,
        hgToken=hgToken,
        modelBasedOn=modelBasedOn
    )

    print("[attack] model loaded")
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

    print("[attack] PWWSAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.PWWSAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    print("[attack] PWWSAttacker Finished")

    result.append({
        "attacker": "PWWSAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    print("[attack] DeepWordBugAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.DeepWordBugAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    print("[attack] DeepWordBugAttacker Finished")

    result.append({
        "attacker": "DeepWordBugAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    print("[attack] GANAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.GANAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    print("[attack] GANAttacker Finished")

    result.append({
        "attacker": "GANAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    print("[attack] PSOAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.PSOAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    print("[attack] PSOAttacker Finished")
    result.append({
        "attacker": "PSOAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    print("[attack] HotFlipAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.HotFlipAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    print("[attack] HotFlipAttacker Finished")
    result.append({
        "attacker": "HotFlipAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    score = (total - success) * 100.0 / total
    return score, result, started_at
