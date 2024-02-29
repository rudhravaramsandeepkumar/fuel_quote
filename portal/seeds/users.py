from .. import LOG
from ..models.UserCredentials import UserCredentials
from ..models.price_management import PriceManagement


class AddUsers:
    def __init__(self, db):
        self.db = db

    def run(self):
        self.create_users()
        try:
            self.db.session.commit()
        except Exception as e:
            LOG.error(e)

    def create_users(self):
        user1 = UserCredentials(Id=1,
                                user_uid="2210202200040505442",
                                password="K2Lr1gbcy154tVtwbgko1w==",
                                username="admin",
                                email_id="fuelquote.email@gmail.com",
                                active='y',
                                status='completed',
                                attributes_1='admin')
        self.db.session.merge(user1)
        user2 = PriceManagement(Id=1,
                                price_id="2210202200040505442",
                                price_="1.50",
                                quantity_="2000",
                                fuel_type="diesel")
        self.db.session.merge(user1)
        self.db.session.merge(user2)
