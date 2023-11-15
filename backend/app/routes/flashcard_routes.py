#!/usr/bin/env/python3
# backend/app/routes/flashcard_routes.py
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flasgger import swag_from

from backend.app.models.flashcard import Flashcard

flashcard_bp = Blueprint("flashcard", __name__)


@flashcard_bp.route("/api/flashcards", methods=["POST"])
@jwt_required()
def create_flashcard():
    """
    Create a new flashcard.
    ---
    tags:
      - flashcards
    parameters:
      - in: header
        name: Authorization
        type: string
        required: true
        description: A valid JWT token.
      - in: body
        name: body
        required: true
        schema:
          type: object
          properties:
            word:
              type: string
              example: "Example Word"
            definition:
              type: string
              example: "Example Definition"
            picture:
              type: string
              example: "URL or Base64 Encoded Image (optional)"
    responses:
      201:
        description: Flashcard successfully created.
      400:
        description: Invalid request format.
      500:
        description: Server error.
    """
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        word = data.get("word")
        definition = data.get("definition")
        picture = data.get("picture")

        # Validate input data
        if not word or not definition:
            return jsonify({"error": "Word and definition are required"}), 400

        # Create a new flashcard
        flashcard = Flashcard(word=word, definition=definition, picture=picture, created_by=current_user)
        flashcard.save()

        return jsonify({"message": "Flashcard successfully created"}), 201

    except Exception as e:
        # Handle exceptions, log the error, and return a 500 response
        print(f"Error creating flashcard: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500



"""Get all the flashcard in the database"""
@flashcard_bp.route("/api/flashcards", methods=["GET"])
def get_all_flashcards():
    """
    Get a list of all flashcards.
    ---
    tags:
      - flashcards
    responses:
      200:
        description: Successfully retrieved flashcards.
      500:
        description: Server error.
    """
    try:
        # Retrieve all flashcards
        flashcards = Flashcard.objects.all()

        # Convert flashcards to JSON format
        flashcards_data = [
            {
                "id": str(flashcard.id),
                "word": flashcard.word,
                "definition": flashcard.definition,
                "picture": flashcard.picture,
                "created_at": flashcard.created_at,
                "created_by": flashcard.created_by.username,
            }
            for flashcard in flashcards
        ]

        return jsonify(flashcards_data), 200

    except Exception as e:
        # Handle exceptions, log the error, and return a 500 response
        print(f"Error retrieving flashcards: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500

"""GET endpoint to retrieve a specific flashcard by its ID"""
@flashcard_bp.route("/api/flashcards/<string:flashcard_id>", methods=["GET"])
def get_flashcard_by_id(flashcard_id):
    """
    Get details of a specific flashcard by ID.
    ---
    tags:
      - flashcards
    parameters:
      - in: path
        name: flashcard_id
        type: string
        required: true
        description: ID of the flashcard to retrieve.
    responses:
      200:
        description: Flashcard details successfully retrieved.
      404:
        description: Flashcard not found.
      500:
        description: Server error.
    """
    try:
        # Retrieve the flashcard by ID
        flashcard = Flashcard.objects.get(id=flashcard_id)

        # Convert flashcard to JSON format
        flashcard_data = {
            "id": str(flashcard.id),
            "word": flashcard.word,
            "definition": flashcard.definition,
            "picture": flashcard.picture,
            "created_at": flashcard.created_at,
            "created_by": flashcard.created_by.username,
        }

        return jsonify(flashcard_data), 200

    except DoesNotExist:
        # Return a 404 response if the flashcard is not found
        return jsonify({"error": "Flashcard not found"}), 404

    except Exception as e:
        # Handle exceptions, log the error, and return a 500 response
        print(f"Error retrieving flashcard: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500


@flashcard_bp.route("/api/flashcards/<string:flashcard_id>", methods=["PUT"])
@jwt_required()
def update_flashcard(flashcard_id):
    """
    Update an existing flashcard by ID.
    ---
    tags:
      - flashcards
    parameters:
      - in: header
        name: Authorization
        type: string
        required: true
        description: A valid JWT token.
      - in: path
        name: flashcard_id
        type: string
        required: true
        description: ID of the flashcard to update.
      - in: body
        name: body
        required: true
        schema:
          type: object
          properties:
            word:
              type: string
              example: "Updated Word"
            definition:
              type: string
              example: "Updated Definition"
            picture:
              type: string
              example: "Updated URL or Base64 Encoded Image (optional)"
    responses:
      200:
        description: Flashcard successfully updated.
      404:
        description: Flashcard not found.
      400:
        description: Invalid request format.
      500:
        description: Server error.
    """
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        updated_word = data.get("word")
        updated_definition = data.get("definition")
        updated_picture = data.get("picture")

        # Validate input data
        if not updated_word and not updated_definition:
            return jsonify({"error": "Word or definition is required"}), 400

        # Retrieve the flashcard by ID
        flashcard = Flashcard.objects.get(id=flashcard_id)

        # Check if the current user is the creator of the flashcard
        if current_user != flashcard.created_by:
            return jsonify({"error": "Permission denied. You are not the creator of this flashcard."}), 403

        # Update flashcard attributes
        flashcard.word = updated_word or flashcard.word
        flashcard.definition = updated_definition or flashcard.definition
        flashcard.picture = updated_picture or flashcard.picture
        flashcard.save()

        return jsonify({"message": "Flashcard successfully updated"}), 200

    except DoesNotExist:
        # Return a 404 response if the flashcard is not found
        return jsonify({"error": "Flashcard not found"}), 404

    except Exception as e:
        # Handle exceptions, log the error, and return a 500 response
        print(f"Error updating flashcard: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500



@flashcard_bp.route("/api/flashcards/<string:flashcard_id>", methods=["DELETE"])
@jwt_required()
def delete_flashcard(flashcard_id):
    """
    Delete a specific flashcard by ID.
    ---
    tags:
      - flashcards
    parameters:
      - in: header
        name: Authorization
        type: string
        required: true
        description: A valid JWT token.
      - in: path
        name: flashcard_id
        type: string
        required: true
        description: ID of the flashcard to delete.
    responses:
      204:
        description: Flashcard successfully deleted.
      404:
        description: Flashcard not found.
      403:
        description: Permission denied. You are not the creator of this flashcard.
      500:
        description: Server error.
    """
    try:
        current_user = get_jwt_identity()

        # Retrieve the flashcard by ID
        flashcard = Flashcard.objects.get(id=flashcard_id)

        # Check if the current user is the creator of the flashcard
        if current_user != flashcard.created_by:
            return jsonify({"error": "Permission denied. You are not the creator of this flashcard."}), 403

        # Delete the flashcard
        flashcard.delete()

        return jsonify({"message": "Flashcard successfully deleted"}), 204

    except DoesNotExist:
        # Return a 404 response if the flashcard is not found
        return jsonify({"error": "Flashcard not found"}), 404

    except Exception as e:
        # Handle exceptions, log the error, and return a 500 response
        print(f"Error deleting flashcard: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500

# That completes the CRUD operations for flashcards.

