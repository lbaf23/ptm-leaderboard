import datasets
import transformers
import OpenAttack as oa
from contextlib import contextmanager

SA_LABELS = 2
NLI_LABELS = 3
QQP_LABELS = 2
CSA_LABELS = 2


def sst_dataset(x):
    return {
        "x": x["sentence"],
        "y": 1 if x["label"] > 0.5 else 0,
    }


def ChnSentiCorp_dataset(x):
    return {
        "x": x["text"],
        "y": x["label"],
    }


def snli_mapping(x):
    return {
        "x": x["premise"] + x["hypothesis"],
        "y": x["label"],
    }


def qqp_mapping(x):
    return {
        "x": x["question1"] + ", " + x["question2"],
        "y": x["label"],
    }


@contextmanager
def no_ssl_verify():
    import ssl
    from urllib import request

    try:
        request.urlopen.__kwdefaults__.update({'context': ssl.SSLContext()})
        yield
    finally:
        request.urlopen.__kwdefaults__.update({'context': None})


def test(model_path, hgToken=''):
    dataset = datasets.load_dataset("snli", split="test[:%s]" % 5).map(function=snli_mapping)
    # dataset = datasets.load_dataset("sst", split="train[:%s]" % 5).map(function=sst_dataset)

    tokenizer = transformers.AutoTokenizer.from_pretrained(model_path, use_auth_token=hgToken)
    model = transformers.AutoModelForSequenceClassification.from_pretrained(
        model_path,
        num_labels=NLI_LABELS,
        output_hidden_states=False
    )
    
    emb = model.bert.embeddings.word_embeddings
    victim = oa.classifiers.TransformersClassifier(model, tokenizer, emb)

    print("[attack] model loaded")

    print("[attack] PWWSAttacker Start")
    with no_ssl_verify():
        attacker = oa.attackers.PWWSAttacker()
    attack_eval = oa.AttackEval(attacker, victim)
    res = attack_eval.eval(dataset, visualize=False, progress_bar=True)
    print(res)
    print("[attack] PWWSAttacker Finished")


if __name__ == "__main__":
    model_path = "cross-encoder/nli-distilroberta-base"
    # model_path = 'echarlaix/bert-base-uncased-sst2-acc91.1-d37-hybrid'
    # model_path = './user_model'
    test(model_path, "")
