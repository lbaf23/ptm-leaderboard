import datasets


def sst_dataset(x):
    return {
        "x": x["sentence"],
        "y": 1 if x["label"] > 0.5 else 0,
    }


def imdb_dataset(x):
    return {
        "x": x["text"],
        "y": x["label"],
    }


def download_sst(len):
    dataset = datasets.load_dataset("sst", split="train[:%s]" % len).map(function=sst_dataset)
    dataset.save_to_disk('datasets/sst')


download_sst(10)
