from backend.app import db
from datetime import datetime  # Import datetime directly
from flask_mongoengine import MongoEngine

db = MongoEngine()

class User(db.Document):
    username = db.StringField(unique=True, max_length=128, required=True)
    email = db.EmailField(unique=True, required=True)
    password = db.StringField(required=True)
    first_name = db.StringField(max_length=128, required=True)
    last_name = db.StringField(max_length=128, required=True)
    created_at = db.DateTimeField(default=datetime.utcnow)  # Use datetime directly
    flashcards = db.ListField(db.ReferenceField('Flashcard'))

    def __repr__(self):
        return f"<User(username={self.username}, email={self.email}, created_at={self.created_at})>"

