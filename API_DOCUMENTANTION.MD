# API Documentation


## Table of Contents
- [User Endpoints](#user-endpoints)
  - [Signup User](#signup-user)
  - [Login User](#login-user)
  - [Upload Profile Image](#upload-profile-image)
  - [Endpoint](#endpoint)
  - [Request](#request)
    - [Headers](#headers)
    - [Body](#body)
  - [Response](#response)
    - [Success Response](#success-response)
  - [Delete Account](#delete-account)
## User Endpoints

### signup User

- **URL:** `/api/users/signup`
- **Method:** `POST`
- **Request:**
  - Body:
    - `username` (string): User's username
    - `email` (string): User's email
    - `password` (string - strong password with one uppercase one special character): User's password

- **Response:**
  - Status Code: `201 Created`
  - Body: `{ "message": "User created successfully" }`

### Login User

- **URL:** `/api/users/login`
- **Method:** `POST`
- **Request:**
  - Body:
    - `email` (string): User's email
    - `password` (string): User's password

- **Response:**
  - Status Code: `200 OK`
  - Body: `{ token: 'jwt-token}`
# Profile Picture Upload
Upload a profile picture for a user.
## Endpoint

```plaintext
POST /api/users/upload-profile-image
```
## Request

- **Headers**
  - Content-Type: `multipart/form-data`
  - Authorization: Bearer `<access_token>`

- **Body**
  - **form-data**
    - key: `image`, type: File
      - Choose the profile image file to upload.

## Response

- **Success Response: 200 OK**

  ```json
  {
    "message": "Profile image uploaded successfully.",
    "imageUrl": "https://storage.googleapis.com/profile-image-url.appspot.com/profile-images/{userId}/{filename}?GoogleAccessId={GoogleAccessId}&Expires={Expires}&Signature={Signature}"
  }
```

## Delete Account

- **URL:** `/api/users/delete-account`
- **Method:** `DELETE`
- **Authorization:** Bearer Token (Include the user's JWT token in the Authorization header)
- **Response:**
  - Status Code: `200 OK`
  - Body: `{ message: "Account deleted successfully." }`
  - Status Code: `500 Internal Server Error`
  - Body: `{ message: "Internal Server Error" }`

