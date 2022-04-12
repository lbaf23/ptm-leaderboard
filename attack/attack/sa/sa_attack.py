import OpenAttack as oa
import datasets
import transformers

def dataset_mapping(x):
    return {
        "x": x["sentence"],
        "y": 1 if x["label"] > 0.5 else 0,
    }
    
# attack a model
def sa_attack(config, model_path):
    dataset = datasets.load_dataset("sst", split="train[:%s]" % config.get("config", "dataSize")).map(function=dataset_mapping)

    tokenizer = transformers.AutoTokenizer.from_pretrained(model_path)
    model = transformers.AutoModelForSequenceClassification.from_pretrained(model_path, num_labels=2, output_hidden_states=False)
    victim = oa.classifiers.TransformersClassifier(model, tokenizer, model.bert.embeddings.word_embeddings)

    score = 0

    attacker = oa.attackers.PWWSAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res1 = attack_eval.eval(dataset, visualize=False)

    score = score + res1.get("Attack Success Rate")

    attacker = oa.attackers.TextBuggerAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res2 = attack_eval.eval(dataset, visualize=False)

    score = score + res1.get("Attack Success Rate")

    score = score * 100 / 2
    result = {
        "PWWSAttacker": res1,
        "TextBuggerAttacker": res2,
    }

    return score, result
