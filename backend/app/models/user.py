from backend.app import db
from backend.app.models.base import BaseModel

class User(BaseModel):
    """
    Represents a user of the flashcard application.
    """
    username = db.StringField(unique=True, max_length=128, required=True)  # Added username field
    email = db.EmailField(unique=True, required=True)
    password = db.StringField(required=True)
    first_name = db.StringField(max_length=128, required=True)
    last_name = db.StringField(max_length=128, required=True)

