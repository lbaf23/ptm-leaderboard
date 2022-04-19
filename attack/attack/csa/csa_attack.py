import OpenAttack as oa
import datasets
import transformers
import datetime
import json


class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%dT%H:%M:%SZ")
        else:
            return json.JSONEncoder.default(self, obj)


def csa_attack(config, client, record_id, task_id, user_id, model_path, mode='file', hgToken=''):
    dataset = datasets.load_from_disk('datasets/ChnSentiCorp', keep_in_memory=True)

    if (mode == 'hg'):
        tokenizer = transformers.AutoTokenizer.from_pretrained(model_path, use_auth_token=hgToken)
        model = transformers.AutoModelForSequenceClassification.from_pretrained(
            model_path,
            num_labels=2,
            output_hidden_states=False,
            use_auth_token=hgToken
        )
    else:
        tokenizer = transformers.AutoTokenizer.from_pretrained(model_path)
        model = transformers.AutoModelForSequenceClassification.from_pretrained(model_path, num_labels=2,
                                                                                output_hidden_states=False)

    victim = oa.classifiers.TransformersClassifier(model, tokenizer, model.bert.embeddings.word_embeddings)

    print("[attack] model loaded")
    started_at = datetime.datetime.now()
    data = {
        "recordId": record_id,
        "startedAt": started_at,
        "taskId": task_id,
        "userId": user_id,
        "status": "running",
    }
    res = json.dumps(data, cls=DateEncoder).encode()
    client.publish(subject="startAttack", payload=res)


    result = []
    success = 0
    total = 0

    print("[attack] PWWSAttacker Start")
    attacker = oa.attackers.PWWSAttacker(lang="chinese")
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    print("[attack] PWWSAttacker Finished")
    result.append({
        "attacker": "PWWSAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    print("[attack] HotFlipAttacker Start")
    attacker = oa.attackers.HotFlipAttacker(lang="chinese")
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    print("[attack] HotFlipAttacker Finished")
    result.append({
        "attacker": "HotFlipAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    print("[attack] PSOAttacker Start")
    attacker = oa.attackers.PSOAttacker(lang="chinese")
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    print("[attack] PSOAttacker Finished")
    result.append({
        "attacker": "PSOAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    print("[attack] UATAttacker Start")
    attacker = oa.attackers.UATAttacker(lang="chinese")
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    print("[attack] UATAttacker Finished")
    result.append({
        "attacker": "UATAttacker",
        "result": res
    })
    success = success + res.get("Successful Instances")
    total = total + res.get("Total Attacked Instances")

    score = (total - success) * 100.0 / total
    return score, result, started_at
