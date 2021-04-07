from .db import db


class DogRoute(db.Model):
    __tablename__ = 'dog_routes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    distance = db.Column(db.Float, nullable=False)
    markerList = db.Column(db.JSON, nullable=False)
    markerListOrder = db.Column(db.JSON, nullable=False)
    roundTrip = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "distance": self.distance,
            "markerList": self.markerList,
            "markerListOrder": self.markerListOrder,
            "roundTrip": self.roundTrip
            }
