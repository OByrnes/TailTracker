from .db import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
import datetime


class DogActivity(db.Model):
    __tablename__ = 'dogActivities'

    id = db.Column(db.Integer, primary_key=True)
    dog_id = db.Column(db.Integer, db.ForeignKey("dogs.id"), nullable=False)
    activityType_id = db.Column(db.Integer, db.ForeignKey("activity_types.id"), nullable=False)
    date = db.Column(db.dateTime default=datetime.datetime.now())
    