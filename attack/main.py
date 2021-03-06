from pynats import NATSClient
import json
import datetime
from attack import start_attack
from conf import init_config
from nats import publish
import logging


class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%dT%H:%M:%SZ")
        else:
            return json.JSONEncoder.default(self, obj)


config = init_config()


with NATSClient(config.get("config", "natsURL")) as client:
    client.connect()
    print("[attack] nats connected")

    def handle(msg):
        message = json.loads(msg.payload)

        data = {
            "recordId": message.get('recordId'),
            "taskId": message.get('taskId'),
            "userId": message.get('userId'),
            "status": "loading",
        }
        res = json.dumps(data, cls=DateEncoder).encode()

        publish(client, subject="loadAttack", payload=res)

        attack_result, started_at = start_attack(
            config,
            client,
            message.get('recordId'),
            message.get('taskId'),
            message.get('userId'),
            message.get('fileUrl'),
            message.get('modelBasedOn'),
            message.get('mode'),
            message.get('hgToken'),
        )

        finished_at = datetime.datetime.now(datetime.timezone.utc)
        running_time = (finished_at - started_at).seconds

        data = {
            "recordId": message.get('recordId'),
            "taskId": message.get('taskId'),
            "userId": message.get('userId'),
            "userName": message.get('userName'),
            "finishedAt": finished_at,
            "runningTime": running_time,

            "score": attack_result.get('score'),
            "result": json.dumps(attack_result.get('result')),
            "status": attack_result.get('status'),

            "modelName": message.get('modelName'),
            "message": attack_result.get('message')
        }
        res = json.dumps(data, cls=DateEncoder).encode()

        publish(client, subject="finishAttack", payload=res)

    client.subscribe(subject="attack", callback=handle)
    client.wait()
