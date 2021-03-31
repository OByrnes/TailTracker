from .db import db


class Breed(db.Model):
    __tablename__ = 'breeds'

    id = db.Column(db.Integer, primary_key=True)
    avg_activity_level(db.Integer, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    bred_for = db.Column(db.String(75))
    life_span = db.Column(db.String(20))
    breed_group= db.Column(db.String(100))
    weight = db.Column(db.String(100))
    height = db.Column(db.String(100))
