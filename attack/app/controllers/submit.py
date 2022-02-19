from concurrent.futures import ThreadPoolExecutor
from flask_cors import cross_origin
from flask import request, Blueprint
from app.attack import start_attack
from app.models import db

executor = ThreadPoolExecutor(1)

submit_blueprint = Blueprint("submit", __name__, url_prefix='/submit')


@submit_blueprint.route('/', methods=['POST'])
@cross_origin()
def submit():
    data = request.form.to_dict()

    print(db)
    executor.submit(
        start_attack,
        db,
        data.get('id'),
        data.get('taskId'),
        data.get('userId'),
        data.get('fileUrl')
    )

    return {"code": 202}
