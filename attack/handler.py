import json
from .config import init_config
from .database import PostgreSQL
from .attack import start_attack

config = init_config()
db = PostgreSQL(config)


def handle(req):
    data = json.loads(req)
    start_attack(
        config,
        db,
        data.get('id'),
        data.get('taskId'),
        data.get('userId'),
        data.get('userName'),
        data.get('fileUrl'),
        data.get('modelName')
    )
    return {"code": 202}
