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



def sa_attack(config, client, record_id, task_id, user_id, model_path, mode='file', hgToken=''):
    dataset = datasets.load_from_disk('datasets/sst', keep_in_memory=True)

    if(mode == 'hg'):
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


    rate = 0
    result = []

    print("[attack] PWWSAttacker Start")
    attacker = oa.attackers.PWWSAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False)
    print("[attack] PWWSAttacker Finished")

    result.append({
        "attacker": "PWWSAttacker",
        "result": res
    })
    rate = rate + res.get("Attack Success Rate")

    print("[attack] DeepWordBugAttacker Start")
    attacker = oa.attackers.DeepWordBugAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False)
    print("[attack] DeepWordBugAttacker Finished")

    result.append({
        "attacker": "DeepWordBugAttacker",
        "result": res
    })

    rate = rate + res.get("Attack Success Rate")

    print("[attack] GANAttacker Start")
    attacker = oa.attackers.GANAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False)
    print("[attack] GANAttacker Finished")

    result.append({
        "attacker": "GANAttacker",
        "result": res
    })

    rate = rate + res.get("Attack Success Rate")

    score = (1 - rate / 3) * 100
    return score, result, started_at
