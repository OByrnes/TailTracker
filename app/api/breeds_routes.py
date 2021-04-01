from flask import Blueprint, jsonify, session, request
from app.models import Breed, db

breeds_routes = Blueprint('breeds', __name__)

@breeds_routes.route('/')
def get_all_breeds():
    breedList = Breed.query.all()
    return jsonify({"breeds": [breed.to_dict() for breed in breedList]})