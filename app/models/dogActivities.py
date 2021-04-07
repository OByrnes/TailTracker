from .db import db
from .activityType import ActivityType
from .dogRoute import DogRoute
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
import datetime


class DogActivity(db.Model):
    __tablename__ = 'dogActivities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    route_id = db.Column(db.Integer, db.ForeignKey("dog_routes.id"))
    activity_img = db.Column(db.String(500))
    dog_id = db.Column(db.Integer, db.ForeignKey("dogs.id"), nullable=False)
    activityType_id = db.Column(db.Integer, db.ForeignKey("activity_types.id"), nullable=False)
    minutes = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now())
    comment = db.Column(db.String(500))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "route": self.route_id,
            "activity_img": self.activity_img,
            "activityType": ActivityType.query.filter(ActivityType.id == self.activityType_id).first().to_dict(),
            "minutes": self.minutes,
            "date": self.date,
            "comment": self.comment
            }
    