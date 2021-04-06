from flask import Blueprint, jsonify, session, request
from app.models import ActivityType, DogActivity, db
from flask_login import current_user, login_required
from app.forms import NewActivityForm
import datetime
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

activity_routes = Blueprint('activities', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@activity_routes.route('/activitytypes')
def get_all_breeds():
    activityTypesList = ActivityType.query.all()
    return jsonify({"activityTypes": [actType.to_dict()
                                      for actType in activityTypesList]})


@activity_routes.route("", methods=['POST'])
def add_activity():
    url = ''
    if "image" in request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400
        url = upload["url"]
    form = NewActivityForm(request.form)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        newActivity = DogActivity(dog_id=form.data["dog_id"],
                                  name=form.data['name'],
                                  activityType_id=form.data["activityType_id"],
                                  activity_img=url,
                                  minutes=form.data["minutes"],
                                  date=request.form.get("date"))
        db.session.add(newActivity)
        db.session.commit()
        return newActivity.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@activity_routes.route("/addimage/<int:activity_id>", methods=['PATCH'])
def add_activity_image(activity_id):
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400
    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    updatedActivity = DogActivity.query.filter(
        DogActivity.id == activity_id).first()
    updatedActivity.activity_img = url
    db.session.commit()
    return updatedActivity.to_dict()


@activity_routes.route("/addcomment/<int:activity_id>", methods=["POST"])
@login_required
def add_comment(activity_id):
    activity = DogActivity.query.filter(DogActivity.id == activity_id).first()
    activity.comment = request.form["comment"]
    db.session.commit()
    return activity.to_dict()


@activity_routes.route("/delete/<int:activity_id>", methods=["DELETE"])
@login_required
def delete_activity(activity_id):
    activity = DogActivity.query.filter(DogActivity.id == activity_id).first()
    db.session.delete(activity)
    db.session.commit()
    return {"activity Removed": "Success"}
