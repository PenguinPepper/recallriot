from backend.app import db
from backend.app.models.base import BaseModel

class Flashcard(BaseModel):
    """
    Represents a flashcard in the application.
    """
    word = db.StringField(max_length=128, required=True)
    definition = db.StringField(max_length=512, required=True)
    picture = db.StringField(max_length=256)

    def __repr__(self):
        return f"<Flashcard(word={self.word}, definition={self.definition})>"

