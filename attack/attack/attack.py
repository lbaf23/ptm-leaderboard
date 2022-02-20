import json
import time
import datetime


def start_attack(config, db, id, task_id, user_id, user_name, file_url, model_name):
    started_at = datetime.datetime.now()
    update_record_start_time(db, id, started_at)

    time.sleep(65)

    # TODO generate attack score and result    file_url

    result = [
        {'trans': 'SwapSpecialEnt-Movie', 'score': 90},
        {'trans': 'SwapSpecialEnt-Person', 'score': 90},
        {'trans': 'AddSum-Movie', 'score': 90},
        {'trans': 'AddSum-Person', 'score': 90},
        {'trans': 'DoubleDenial', 'score': 90},
    ]
    score = 91

    finished_at = datetime.datetime.now()
    running_time = (finished_at - started_at).seconds

    print("score: %s" % score)

    str_result = json.dumps(result)
    update_attack_result(db, id, task_id, user_id, user_name, finished_at, running_time, score, str_result, model_name)


def update_record_start_time(db, id, started_at):
    sql = """
        update record set
            started_at = '%s',
            status = 'running'
        where id = '%s'""" % (
            started_at,
            id
        )

    _, b = db.execute(sql)
    return b


def update_attack_result(db, id, task_id, user_id, user_name, finished_at, running_time, score, result, model_name):
    conn, cursor = db.get_connect()
    try:
        sql = """
            update record set 
                finished_at = '%s',
                running_time = '%s', 
                score = '%s', 
                result = '%s', 
                status = 'succeed' 
            where id = '%s' """ % (
                finished_at,
                running_time,
                score,
                result,
                id
            )
        cursor.execute(sql)

        sql = "select score from rank where task_id = '%s' and user_id = '%s'" % (task_id, user_id)
        cursor.execute(sql)
        res = cursor.fetchone()

        if len(res) == 0:
            sql = """
                insert into 
                rank(task_id, user_id, user_name, model_name, score, result)
                values('%s', '%s', '%s', '%s', '%s', '%s')
            """ & (
                task_id,
                user_id,
                user_name,
                model_name,
                score,
                result
            )
        elif res <= score:
            sql = """
                update rank set
                    score = '%s', 
                    result = '%s', 
                    model_name = '%s' 
                WHERE 
                    task_id = '%s' and 
                    user_id = '%s'""" % (

                    score,
                    result,
                    model_name,
                    task_id,
                    user_id
                )
            cursor.execute(sql)

        conn.commit()
        return True
    except Exception as e:
        print(e)
        conn.rollback()
        return False
    finally:
        db.close_connect(conn, cursor)
