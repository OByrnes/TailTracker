from .db import db
# import enum
# class EnumActivityType(enum.Enum):
#     walk = "walk"
#     run= "run"
#     bikeride = "bike ride"
#     dog_park = "dog park"
#     playtime_with_dog_friends = "playtime with dog friends"
#     playtime_with_human_friend = "playtime with human friends"
#     other = "other"


class ActivityType(db.Model):
    __tablename__ = 'activity_types'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    exertion = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "exertion": self.exertion
        }
