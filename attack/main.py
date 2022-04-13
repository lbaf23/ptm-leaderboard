from pynats import NATSClient
import json
import datetime
from attack import start_attack, fake_attack
from conf import init_config


config = init_config()


class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%dT%H:%M:%SZ")
        else:
            return json.JSONEncoder.default(self, obj)


with NATSClient(config.get("config", "natsURL")) as client:
    client.connect()
    print("-->nats connected")

    def handle(msg):
        message = json.loads(msg.payload)

        started_at = datetime.datetime.now()
        data = {
            "recordId": message.get('recordId'),
            "startedAt": started_at,
            "taskId": message.get('taskId'),
            "userId": message.get('userId'),
        }
        res = json.dumps(data, cls=DateEncoder).encode()

        client.publish(subject="startAttack", payload=res)

        print("-->start attack")
        
        if(config.get("config", "fake") == 'on'):
            attack_result = fake_attack()
        else:
            attack_result = start_attack(
                config,
                message.get('taskId'),
                message.get('fileUrl'),
            )
        

        finished_at = datetime.datetime.now()
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
        client.publish(subject="finishAttack", payload=res)

    client.subscribe(subject="attack", callback=handle)
    client.wait()
