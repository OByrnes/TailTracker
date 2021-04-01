from app.models import db, ActivityType
typeslist = [{"type": "walk", "exertion": 1},
        {"type": "jog", "exertion": 1.5},
        {"type": "bike ride", "exertion": 2},
        {"type": "dog_park", "exertion": 1.5},
        {"type": "playtime with dog friends", "exertion": 2},
        {"type": "playtime with human friends", "exertion": 1},
        {"type": "hike", "exertion": 1.3},
        {"type": "other", "exertion": 1}]

def seed_activity_types():
    for typeele in typeslist:
        newType = ActivityType(type=typeele["type"],exertion=typeele["exertion"])
        db.session.add(newType)
        db.session.commit()



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_activity_types():
    db.session.execute('TRUNCATE activity_types;')
    db.session.commit()
