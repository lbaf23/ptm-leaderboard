import transformers
import OpenAttack as oa
from utils import decode
import zipfile
import shutil
import requests
import os


def unzip_file(name):
    zip_file = zipfile.ZipFile(name)
    zip_file.extractall('user_model')
    zip_file.close()
    os.rename(zip_file.filename.split('.')[0], "user_model")
    return 'user_model'


def del_all():
    if os.path.exists('user_model'):
        shutil.rmtree('user_model')
    if os.path.exists('user_model.zip'):
        os.remove('user_model.zip')


def get_file(url):
    del_all()
    if url.startswith('http'):
        r = requests.get(url=url, stream=True)
        f = open('user_model.zip', 'wb')
        for chunk in r.iter_content(chunk_size=1024):
            if chunk:
                f.write(chunk)
        f.close()
        return 'user_model.zip'
    else:
        return url


def load_victim(mode, file_url, hgToken, modelBasedOn):
    if mode == 'hg':
        print("[attack] use Hugging Face Model")
        model_path = file_url
        # rsa
        if hgToken != "":
            hgToken = decode(hgToken)

        tokenizer = transformers.AutoTokenizer.from_pretrained(model_path, use_auth_token=hgToken)
        model = transformers.AutoModelForSequenceClassification.from_pretrained(
            model_path,
            num_labels=2,
            output_hidden_states=False,
            use_auth_token=hgToken
        )
    else:
        print("[attack] download model file")
        model_path = unzip_file(get_file(file_url))
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
