from flask import current_app as app
from flask_cors import cross_origin
from .controllers import executor
from ..attack import start_attack


@app.route("/", methods=["POST"])
@cross_origin()
def home():
    app.logger.error("submit")
    executor.submit(start_attack)
    return {"code": 200}
