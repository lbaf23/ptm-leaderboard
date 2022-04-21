import rsa


with open("private.pem", "rb") as f:
    k = f.read()
    key = rsa.PrivateKey.load_pkcs1(k)


def decode(data):
    return rsa.decrypt(
        bytes(data, encoding="utf8"),
        key
    ).decode("utf-8")
