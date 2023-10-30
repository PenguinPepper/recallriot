from app import mongo

class Flashcard:
    """
    Represents a flashcard in the application.
    create a class called flashcard
    """
    def __init__(self, word, definition, picture=None):
        """
        Initializes a new Flashcard instance.

        Args:
            word (str): The word or term on the flashcard.
            definition (str): The definition or description associated with the word.
            picture (str, optional): URL or file path to an image associated with the flashcard.
        """
        self.word = word
        self.definition = definition
        self.picture = picture

    def save(self):
        """
        Saves the flashcard to the database.
        """
        mongo.db.flashcards.insert_one({
            "word": self.word,
            "definition": self.definition,
            "picture": self.picture
        })

    @staticmethod
    def get_all_flashcards():
        """
        Retrieves all flashcards from the database.

        Returns:
            list: List of flashcard dictionaries.
        """
        return list(mongo.db.flashcards.find())

    @staticmethod
    def get_flashcards_by_word(word):
        """
        Retrieves flashcards by their word from the database.

        Args:
            word (str): The word to search for.

        Returns:
            list: List of flashcard dictionaries matching the word.
        """
        return list(mongo.db.flashcards.find({"word": word}))

    @staticmethod
    def update_flashcard(word, new_definition, new_picture):
        """
        Updates the definition and picture of a flashcard.

        Args:
            word (str): The word of the flashcard to update.
            new_definition (str): The new definition for the flashcard.
            new_picture (str): The new picture URL for the flashcard.
        """
        mongo.db.flashcards.update_one(
            {"word": word},
            {"$set": {"definition": new_definition, "picture": new_picture}}
        )

    @staticmethod
    def delete_flashcard(word):
        """
        Deletes a flashcard by its word. 
        from the database

        Args:
            word (str): The word of the flashcard to delete.
        """
        mongo.db.flashcards.delete_one({"word": word})
