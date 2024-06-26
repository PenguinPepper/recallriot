# RecallRiot Flashcard API DOCUMENTATION

## Authentication Endpoints

- [Introduction](#introduction)
- [Authentication](#authentication)
  - [Sign Up](#sign-up)
  - [Verify Email](#verify-email)
  - [Login](#login)
  - [Forgot Password](#forgot-password)
  - [Reset Password](#reset-password)
  - [Upload Profile Image](#upload-profile-image)
  - [Delete Account](#delete-account)
- [Token Management](#token-management)
  - [Token Refresh](#token-refresh)
  - [Logout](#logout)

### Signup
- **Endpoint:** `POST /auth/signup`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "password": "example_password",
    "email": "example@example.com"
  }
  ```
```json
{
  "message": "User registered successfully. Check your email for verification."
}
```

## Verify Email

- **Endpoint:** `GET /auth/verify-email/:token`
- **Description:** Verify a user's email after registration.
- **Response:**
  ```json
  {
    "message": "Email verified successfully. You can now sign in."
  }
  ```
## Login

- **Endpoint:** `POST /auth/login`
- **Description:** Authenticate a user.
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "password": "example_password"
  }
  ```
  - **Response:**
  json
  {
    "token": "example_access_token"
}

## Forgot Password

  - **Endpoint:** POST /auth/forgot-password
  - **Description:** Request a password reset.
  - **Request Body:**
    ```json
    {
      "email": "example@example.com"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Password reset instructions sent to your email."
    }
    ```
## Reset Password
- **Reset Password**
  - **Endpoint:** POST /auth/reset-password/:token
  - **Description:** Reset the user's password.
  - **Request Body:**
    ```json
    {
      "newPassword": "new_example_password"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Password reset successful. You can now log in with your new password."
    }
    ```
## Upload Profile Image
- **Upload Profile Image**
  - **Endpoint:** POST /auth/upload-profile-image
  - **Description:** Upload a profile image for the authenticated user.
  - **Request Type:** multipart/form-data
  - **Request Parameters:**
    - `profileImage`: Image file
  - **Response:**
    ```json
    {
      "message": "Profile image uploaded successfully.",
      "imageUrl": "https://storage.googleapis.com/recallriot-flashcard.appspot.com/profile-images/example_user/1638863889821.jpg"
    }
    ```
## Delete Account
- **Delete Account**
  - **Endpoint:** DELETE /auth/delete-account
  - **Description:** Delete the authenticated user's account.
  - **Response:**
    ```json
    {
      "message": "Account deleted successfully."
    }
    ```


