from flask import Flask, current_app
from waitress import serve
from config import config, init_config
from concurrent.futures import ThreadPoolExecutor
from attack import start_attack


app = Flask(__name__)

if __name__ == '__main__':
    init_config()
    # serve(app, host='0.0.0.0', port=config.get('app', 'port'))
    app.run(host='0.0.0.0', port=config.get('app', 'port'))
