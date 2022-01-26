import logging
import time

def handle(req):
    """handle a request to the function
    Args:
        req (str): request body
    """

    time.sleep(3)
    logging.info("recv" + str(req))

    return req
