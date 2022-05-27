import datasets
import transformers
import OpenAttack as oa


def test(model_path, hgToken=''):
    dataset = datasets.load_from_disk('datasets/sst', keep_in_memory=False)

    tokenizer = transformers.AutoTokenizer.from_pretrained(model_path, use_auth_token=hgToken)
    model = transformers.AutoModelForSequenceClassification.from_pretrained(
        model_path,
        num_labels=2,
        output_hidden_states=False,
        use_auth_token=hgToken
    )
    
    emb = model.bert.embeddings.word_embeddings
    victim = oa.classifiers.TransformersClassifier(model, tokenizer, emb)

    print("[attack] model loaded")

    print("[attack] PWWSAttacker Start")
    attacker = oa.attackers.PWWSAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    print(res)
    print("[attack] PWWSAttacker Finished")


if __name__ == "__main__":
    # model_path = 'echarlaix/bert-base-uncased-sst2-acc91.1-d37-hybrid'
    model_path = './user_model'
    test(model_path, "")
