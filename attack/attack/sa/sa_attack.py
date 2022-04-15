import OpenAttack as oa
import datasets
import transformers


def sa_attack(config, model_path, mode='file', hgToken=''):
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
    return score, result
