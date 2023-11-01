from flask import Flask
from flask_mongoengine import MongoEngine
import datetime

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {
    "db": "flashcarddb",
    "host": "mongodb://localhost:7000/flashcarddb"
}
db = MongoEngine(app)

# Import models to ensure they are registered with the database
from backend.app.models import user, flashcard

