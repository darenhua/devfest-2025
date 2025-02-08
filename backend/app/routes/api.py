from flask import Blueprint, request, jsonify

api_bp = Blueprint("api", __name__)


@api_bp.route("/research", methods=["POST"])
def conduct_research():
    data = request.get_json()
