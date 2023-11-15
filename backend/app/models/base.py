from backend.app import db

class BaseModel(db.Document):
    created_at = db.DateTimeField(default=datetime.datetime.utcnow)

    def __repr__(self):
        return f"<{self.__class__.__name__}(id={self.id}, created_at={self.created_at})>"


