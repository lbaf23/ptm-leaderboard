import rsa


with open("private.pem", "rb") as f:
    k = f.read()
    key = rsa.PrivateKey.load_pkcs1(k)


def decode(data):
    return rsa.decrypt(data, key).decode("utf-8")
