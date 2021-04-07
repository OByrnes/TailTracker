from flask import Blueprint, jsonify, session, request
from app.models import DogRoute, db
from flask_login import current_user, login_required
import json


dogroutes_routes = Blueprint('dogroutes_routes', __name__)

@dogroutes_routes.route('', methods=["POST"])
def add_new_route():
    if "name" not in request.form:
        return {"errors": "Give the route a name"}
    if "markerList" not in request.form:
        return {"errors": "Please add markers to your route"}
    if "distance" not in request.form:
        return {"errors": "Please add markers to your route"}
        console.log(request.form["markerList"])
    newRoute = DogRoute(name=request.form["name"],
                        user_id=current_user.id,
                        markerList=request.form["markerList"],
                        distance=request.form["distance"],
                        markerListOrder=request.form["markerListOrder"],
                        roundTrip=json.loads(request.form["roundTrip"].lower()))
    db.session.add(newRoute)
    db.session.commit()
    return newRoute.to_dict()

@dogroutes_routes.route("/all")
def get_all_routes():
    routesList = DogRoute.query.filter(DogRoute.user_id == current_user.id).all()
    return jsonify({'routes': [route.to_dict() for route in routesList]})