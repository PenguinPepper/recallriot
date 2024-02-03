# Table of Contents

- [Flashcard recallriot](#Flashcard-recallRiot)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Third Party Api](#third-party-api)
- [Getting Started](#getting-started)
  - [Clone the Repository](#1-clone-the-repository)
  - [Install Dependencies](#2-install-dependencies)
  - [Set up Environment Variables](#3-set-up-environment-variables)
  - [Start the Server](#4-start-the-server)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

# Flashcard recallriot

Welcome to the recallriot. Our flashcard app is a powerful and user-friendly tool designed to enhance your learning experience. It's a digital platform that allows you to create, customize, and study flashcards effortlessly. Whether you're a student preparing for exams, a professional looking to acquire new skills, or anyone eager to expand their knowledge, our flashcard app is tailored to meet your learning needs.
# Key Features

1. **Create and Customize:**
   Easily create digital flashcards with text, images, and even audio to capture and reinforce key concepts. Tailor your flashcards to suit your learning style and preferences.

2. **Organize and Categorize:**
   Keep your study materials organized by creating decks and categories. Structuring your flashcards helps you focus on specific topics or subjects, making your study sessions more efficient.

3. **Smart Learning Algorithms:**
   Leverage intelligent algorithms that adapt to your learning progress. The app utilizes spaced repetition and other smart techniques to optimize your study sessions, ensuring that you review material at the right intervals for maximum retention.

4. **Collaborative Learning:**
   Collaborate with classmates, colleagues, or study groups by sharing flashcard decks. Foster a collaborative learning environment and benefit from the collective knowledge of your peers.

5. **Cross-Platform Accessibility:**
   Access your flashcards anytime, anywhere. Our app is designed for seamless cross-platform usage, allowing you to study on your computer, tablet, or smartphone.

6. **Progress Tracking:**
   Monitor your learning progress with comprehensive analytics. Track your performance, identify strengths and weaknesses, and make informed adjustments to your study strategy.

7. **Offline Mode:**
   Study on the go, even without an internet connection. Our app supports offline mode, ensuring that you can access your flashcards whenever and wherever you need them.

**Unlock the full potential of your learning journey with our flashcard app. Whether you're striving for academic excellence, professional development, or personal enrichment, our app is your dedicated companion for effective and engaging learning.**




## Tech Stack

The backend of this application is built using the following technologies:

- Node.js: JavaScript runtime for server-side development.
- Express: Fast, unopinionated, minimalist web framework for Node.js.
- MongoDB: NoSQL database for storing blog posts, users, and related data.
- Mongoose: MongoDB object modeling for Node.js.
- Multer: Middleware for handling file uploads.
- Sharp: High-performance image resizing library.
- JSON Web Tokens (JWT): Authentication and authorization mechanism.
- Nodemailer: Module for sending emails (used for user registration, etc.).

## Third-Party APIs

The flashcard recallriot integrates with the following third-party APIs:

- Google OAuth: Used for user authentication.
- Firebase Storage: Cloud storage service for storing profile images.
  


## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/PenguinPepper/recallriot
    cd recallriot
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory with the following content:

    ```env
    PORT=3003
    MONGODB_URI=<your_mongodb_connection_uri>
    SECRET_KEY=<your_secret_key>
    CLIENT_URL=http://localhost:3000  # Replace with your client application URL
    GOOGLE_CLIENT_ID=<your_google_client_id>
    GOOGLE_CLIENT_SECRET=<your_google_client_secret>
    GOOGLE_CALLBACK_URL=<your_google_callback_url>
    EMAIL_USERNAME=<your_email_username>
    EMAIL_PASSWORD=<your_email_password>
    EMAIL_APP_PASSWORD=<your_email_app_password>
    FIREBASE_PROJECT_ID=<your_firebase_project_id>
    FIREBASE_PRIVATE_KEY=<your_firebase_private_key>
    FIREBASE_CLIENT_EMAIL=<your_firebase_client_email>
    ```

4. Start the server:

    ```bash
    npm start
    ```

The server will run on port 3003.

## API Documentation

Explore the API endpoints and learn how to integrate with the Blog Application by referring to our [API Documentation](https://github.com/PenguinPepper/recallriot/blob/main/API_DOCUMENTANTION.MD).

## Contributing

If you would like to contribute to the development of this application, please follow our [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [MIT LICENSE]() file for details.


