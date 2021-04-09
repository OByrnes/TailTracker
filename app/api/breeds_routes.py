from flask import Blueprint, jsonify, session, request
from app.models import Breed, db
from flask_login import current_user, login_required

breeds_routes = Blueprint('breeds', __name__)

@breeds_routes.route('/')
@login_required
def get_all_breeds():
    breedList = Breed.query.all()
    return jsonify({"breeds": [breed.to_dict() for breed in breedList]})