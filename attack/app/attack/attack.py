import datetime
import time
from app.models import update_result, update_record_started_time


def start_attack(db, record_id, file_url, task_id, user_id):
    print('worker!')
    print(db)

    start = datetime.datetime.now()
    update_record_started_time(record_id, start)

    time.sleep(1)

    # TODO generate attack result
    end = datetime.datetime.now()
    running_time = end - start
    message = ''
    result = {}
    score = 90

    update_result(
        record_id=record_id,
        task_id=task_id,
        user_id=user_id,
        finished_time=end,
        running_time=running_time,
        message=message,
        result=result,
        score=score
    )
