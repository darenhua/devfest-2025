from flask import Flask, jsonify
from flask_cors import CORS
from app.routes.api import api_bp
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(api_bp, url_prefix='/api/v1')
    
    @app.route("/")
    def root():
        return jsonify({"message": "Health Insurance Advisor API"})
    
    return app 