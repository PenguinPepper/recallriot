from app import mongo
from werkzeug.security import generate_password_hash, check_password_hash

class User:
    """
    Represents a user of the flashcard application.
    """
    def __init__(self, username, password):
        """
        Initializes a new User instance.

        Args:
            username (str): The username of the user.
            password (str): The password of the user.
        """
        self.username = username
        self.password_hash = generate_password_hash(password)  # Hash the password for security

    def save(self):
        """
        Saves the user to the database.
        """
        mongo.db.users.insert_one({
            "username": self.username,
            "password": self.password_hash
        })

    @staticmethod
    def find_by_username(username):
        """
        Finds a user by username in the database.

        Args:
            username (str): The username of the user to find.

        Returns:
            dict: User information if found, None otherwise.
        """
        return mongo.db.users.find_one({"username": username})

    @staticmethod
    def check_password(username, password):
        """
        Checks if the provided password matches the user's hashed password.

        Args:
            username (str): The username of the user.
            password (str): The password to check.

        Returns:
            bool: True if the password is correct, False otherwise.
        """
        user = User.find_by_username(username)
        if user and check_password_hash(user["password"], password):
            return True
        return False
