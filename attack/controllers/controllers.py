from concurrent.futures import ThreadPoolExecutor
from flask import current_app

executor = ThreadPoolExecutor(1)

def init_routers():
    pass