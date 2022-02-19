from flask import Flask
from waitress import serve
from app.config import config, init_config
from app.controllers import init_routers
from app.models import init_db
import os

app = Flask(__name__)

if __name__ == '__main__':
    init_config()
    init_routers(app)
    init_db(app)

    run_mode = os.getenv("run_mode")
    if run_mode == 'release':
        serve(app, host='0.0.0.0', port=config.get('app', 'port'))
    else:
        app.run(port=config.get('app', 'port'), debug=True)
