import transformers
import OpenAttack as oa


def load_victim(mode, model_path, hgToken, modelBasedOn):
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
    elif modelBasedOn == 'distilbert':
        emb = model.distilbert.embeddings.word_embeddings
    else:
        emb = model.bert.embeddings.word_embeddings
    victim = oa.classifiers.TransformersClassifier(model, tokenizer, emb)
    return victim
