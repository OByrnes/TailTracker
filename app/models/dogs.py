from .db import db


class Dog(db.Model):
    __tablename__ = 'dogs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    breed_id = db.Column(db.Integer, db.ForeignKey("breeds.id"), nullable=False)
    daily_goal = db.Column(db.Integer)
    age = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    description = db.Column(db.String(400))
    dog_img = db.Column(db.String(400))
    activities = db.relationship("DogActivity", backref='Dog', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "breed_id": self.breed_id,
            "daily_goal": self.daily_goal,
            "age": self.age,
            "weight": self.weight,
            "description": self.description,
            "dog_img": self.dog_img,
            "activities": [activity.to_dict() for activity in self.activities]
            }
