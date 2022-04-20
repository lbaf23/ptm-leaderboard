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


def qqp_attack(config, client, record_id, task_id, user_id, model_path, modelBasedOn='bert', mode='file', hgToken=''):
    dataset = datasets.load_from_disk('datasets/qqp', keep_in_memory=False)
    if mode == 'hg':
        tokenizer = transformers.AutoTokenizer.from_pretrained(model_path, use_auth_token=hgToken)
        model = transformers.AutoModelForSequenceClassification.from_pretrained(
            model_path,
            num_labels=2,
            output_hidden_states=False,
            use_auth_token=hgToken
        )
    else:
        tokenizer = transformers.AutoTokenizer.from_pretrained(model_path)
        model = transformers.AutoModelForSequenceClassification.from_pretrained(model_path, num_labels=2, output_hidden_states=False)

    if modelBasedOn == 'roberta':
        emb = model.roberta.embeddings.word_embeddings
    else:
        emb = model.bert.embeddings.word_embeddings
    victim = oa.classifiers.TransformersClassifier(model, tokenizer, emb)

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
