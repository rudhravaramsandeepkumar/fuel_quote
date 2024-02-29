import os
from ..models import db
from .users import AddUsers
from .. import is_development


def init_seeds(app):
    if is_development():
        with app.app_context():
            AddUsers(db).run()
            for folder in app.config["DIRECTORIES"]:
                if not os.path.exists(folder):
                    os.mkdir(folder)
    app.logger.info("Initialized Seeds")
