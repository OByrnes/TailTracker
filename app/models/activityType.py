from .db import db
import enum
class EnumActivityType(enum.Enum):
    walk = "walk"
    run= "run"
    bikeride = "bike ride"
    dog_park = "dog park"
    playtime_with_dog_friends = "playtime with dog friends"
    playtime_with_human_friend = "playtime with human friends"
    other = "other"


class ActivityType(db.Model):
    __tablename__ = 'activity_types'

    id = db.Column(db.Integer, primary_key=True)
    avg_activity_level(db.Integer, nullable=False)
    type = db.Column(db.Enum(EnumActivityType), nullable=False)
    unit = db.Column(db.String(30), nullable=False)
    exersion = db.Column(db.Integer, nullable=False)
