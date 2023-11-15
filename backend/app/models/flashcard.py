from backend.app.models.user import db  # Import db from user.py
from datetime import datetime

class Flashcard(db.Document):
    word = db.StringField(max_length=128, required=True)
    definition = db.StringField(max_length=512, required=True)
    picture = db.StringField(max_length=256)
    created_at = db.DateTimeField(default=datetime.utcnow)
    created_by = db.ReferenceField('User')

    def __repr__(self):
        return f"<Flashcard(word={self.word}, definition={self.definition}, created_at={self.created_at})>"

