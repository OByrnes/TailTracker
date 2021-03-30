from .db import db


class Dog(db.Model):
    __tablename__ = 'dogs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    breed_id = db.Column(db.Integer, db.ForeignKey("breeds.id"), nullable=False)
    


   
    tags = db.relationship("Tag", backref="User", cascade="all, delete-orphan")