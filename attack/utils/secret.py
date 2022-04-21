import base64

import rsa


with open("private.pem", "rb") as f:
    k = f.read()
    key = rsa.PrivateKey.load_pkcs1(k)


def decode(data):
    b = base64.b64decode(data.encode("utf-8"))
    return rsa.decrypt(b, key).decode("utf-8")
