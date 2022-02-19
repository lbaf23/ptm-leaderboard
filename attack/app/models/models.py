from flask_sqlalchemy import SQLAlchemy
from app.config import config

db = SQLAlchemy()


def init_db(app):
    uri = "postgresql://%s:%s@%s:%s/%s" % (
        config.get("app", "dbUser"),
        config.get("app", "dbPassword"),
        config.get("app", "dbHost"),
        config.get("app", "dbPort"),
        config.get("app", "dbName"),
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = uri
    db.init_app(app)


class Record(db.Model):
    __tablename__ = 'record'

    id = db.Column(db.Integer, primary_key=True)

    submitted_at = db.Column(db.Time)
    started_at = db.Column(db.Time)
    finished_at = db.Column(db.Time)
    running_time = db.Column(db.Time)

    task_id = db.Column(db.String)
    user_id = db.Column(db.String)

    status = db.Column(db.String)
    message = db.Column(db.String)

    file_url = db.Column(db.String)

    model_name = db.Column(db.String)
    result = db.Column(db.String)
    score = db.Column(db.Float)


class Rank(db.Model):
    __tablename__ = 'rank'

    task_id = db.Column(primary_key=True)
    user_id = db.Column(primary_key=True)

    user_name = db.Column(db.String)
    model_name = db.Column(db.String)

    score = db.Column(db.Float)
    result = db.Column(db.String)


def update_record_started_time(record_id, time):
    Record.query.filter_by(id=record_id).update(
        {
            'started_at': time,
            'status': 'running',
        }
    )
    db.session.commit()


def update_result(record_id, task_id, user_id, finished_time, running_time, message, result, score):
    print(task_id, user_id)

    Record.query.filter_by(id=record_id).update(
        {
            'finished_at': finished_time,
            'running_time': running_time,
            'status': 'running',
            'message': message,
            'result': result,
            'score': score,
        }
    )

    r = Rank.query. \
        filter_by(task_id=task_id). \
        filter_by(user_id=user_id).first()
    print(r.data)

    Rank.query(). \
        filter(Rank.task_id == task_id). \
        filter(Rank.user_id == user_id). \
        update(
        {
            'result': result,
            'score': score
        }
    )
    db.session.commit()
