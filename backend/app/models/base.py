from backend.app import db

class BaseModel(db.Document):
    """
    Base model for User and Flashcard entities.
    Contains common attributes like creation time and string representation.
    """
    created_at = db.DateTimeField(default=datetime.datetime.utcnow)

    def __repr__(self):
        return f"<{self.__class__.__name__}(id={self.id}, created_at={self.created_at})>"

