import datasets


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


def download_sst(len):
    dataset = datasets.load_dataset("sst", split="train[:%s]" % len).map(function=sst_dataset)
    dataset.save_to_disk('datasets/sst')


def download_ChnSentiCorp(len):
    dataset = datasets.load_dataset("seamew/ChnSentiCorp", split="train[:%s]" % len).map(function=ChnSentiCorp_dataset)
    dataset.save_to_disk('datasets/ChnSentiCorp')


def download_snli(len):
    dataset = datasets.load_dataset("snli", split="test[:%s]" % len).map(function=snli_mapping)
    dataset.save_to_disk('datasets/snli')


def download_nltk():
    import nltk
    nltk.download('omw-1.4')


download_sst(10)
download_ChnSentiCorp(10)
download_snli(10)
# download_nltk()
