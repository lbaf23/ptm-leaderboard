from .submit import submit_blueprint

def init_routers(app):
    app.register_blueprint(submit_blueprint)
