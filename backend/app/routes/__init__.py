# backend/app/routes/__init__.py
from flask import Flask
from backend.app.routes.flashcard_routes import flashcard_bp

def create_app():
    app = Flask(__name__)

    # Import and register blueprints
    app.register_blueprint(flashcard_bp)

    return app


