# Recallriot API Documentation

## Authentication Endpoints

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
  ```json
  {
    "token": "example_access_token"
}
```
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



