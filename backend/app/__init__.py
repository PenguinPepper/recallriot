from flask import Flask
from flask_mongoengine import MongoEngine
import datetime

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {
    "db": "flashcarddb",
    "host": "mongodb://localhost:27017/flashcarddb"

}
db = MongoEngine(app)

# Import models to ensure they are registered with the database
from backend.app.models.user import User
from backend.app.models.flashcard import Flashcard

