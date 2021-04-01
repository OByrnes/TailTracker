from .db import db


class Breed(db.Model):
    __tablename__ = 'breeds'

    id = db.Column(db.Integer, primary_key=True)
    avg_activity_level= db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    breed_img_url = db.Column(db.String(400))
    temperament = db.Column(db.String(400))
    bred_for = db.Column(db.String(175))
    life_span = db.Column(db.String(20))
    breed_group= db.Column(db.String(100))
    weight = db.Column(db.String(100))
    height = db.Column(db.String(100))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "avg_activity_level":self.avg_activity_level,
            "breed_img_url": self.breed_img_url,
            "temperament": self.temperament,
            "bred_for": self.bred_for,
            "life_span": self.life_span,
            "weight": self.weight,
            "height": self.height,
            "breed_goup":self.breed_group
            }
