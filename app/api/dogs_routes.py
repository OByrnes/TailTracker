
from flask import Blueprint, request
from app.models import db, Dog
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

dogs_routes = Blueprint("dogs", __name__)


@dogs_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    
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
    name = request.form['name']
    birthday = request.form['birthday']
    weight = int(request.form['weight'])
    description = request.form["description"]
    breed_id = int(request.form['breed_id'])
    # flask_login allows us to get the current user from the request
    new_dog = Dog(user_id=current_user.id, dog_img=url, name=name, breed_id=breed_id, birthday=birthday, weight=weight, description=description)
    db.session.add(new_dog)
    db.session.commit()
    return {"url": url}


@dogs_routes.route("/<int:dog_id>/", methods=["PATCH"])
@login_required
def edit_dog(dog_id):
    dog = Dog.query.filter(Dog.id == dog_id).first()
    if 'image' in request.files:
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
        dog.dog_img=url
    if 'daily_goal' in request.form:
        dog.daily_goal=request.form['daily_goal']
    if "weight" in request.form:
        dog.weight= request.form['weight']
    if "description" in request.form:
        dog.description= request.form['description']
    db.session.commit()
    return {"dog":dog.to_dict()}

@dogs_routes.route("/delete/<int:dog_id>/", methods=["DELETE"])
@login_required
def delete_dog(dog_id):
    dog = Dog.query.filter(Dog.id == dog_id).first()
    db.session.delete(dog)
    db.session.commit()
    return {"Dog Removed":"Success"}