from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DateTimeField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Dog, ActivityType


def dog_exists(form, field):
    print("Checking if dog exists", field.data)
    dog_id = field.data
    dog = Dog.query.filter(dog_id == Dog.id).first()
    if not dog:
        raise ValidationError("Dog provided not found.")
def activityExists(form, field):
    activityType_id = field.data
    print(activityType_id)
    activityType = ActivityType.query.filter(activityType_id == ActivityType.id).first()
    if not activityType:
        raise ValidationError("Activity Type not found")

class NewActivityForm(FlaskForm):
    dog_id = IntegerField('dog_id', validators=[DataRequired(), dog_exists])
    name = StringField("name")
    activityType_id = IntegerField('activityType_id', validators=[
                           DataRequired(), activityExists])
    minutes = IntegerField("minutes", validators=[DataRequired()])
    # date = DateTimeField("date")