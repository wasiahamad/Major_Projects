# User Registration Endpoint

## POST /users/register

### Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### HTTP Method

`POST`

### Request Body
The request body should be a JSON object with the following properties:

- `fullName`: An object containing:
  - `firstName`: A string representing the user's first name (minimum 3 characters).
  - `lastName`: A string representing the user's last name (minimum 3 characters).
- `email`: A string representing the user's email (must be a valid email address).
- `password`: A string representing the user's password (minimum 6 characters).

### Response
- `201 Created`: The user was successfully created. The response will include a JSON object with the user's token and user details.
- `400 Bad Request`: The request was invalid. The response will include a JSON object with an array of error messages.

### Example Request
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

# User Login Endpoint

## POST /users/login

### Description
This endpoint is used to log in an existing user. It requires the user's email and password.

### HTTP Method  

`POST`

### Request Body
The request body should be a JSON object with the following properties:

- `email`: A string representing the user's email (must be a valid email address).
- `password`: A string representing the user's password (minimum 6 characters).

### Response
- `200 OK`: The user was successfully logged in. The response will include a JSON object with the user's token and user details.
- `400 Bad Request`: The request was invalid. The response will include a JSON object with an array of error messages.
- `401 Unauthorized`: The email or password was incorrect.

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

# Captain Registration Endpoint

## POST /captains/register

### Description
This endpoint is used to register a new captain. It requires the captain's first name, last name, email, password, vehicle color, plate, capacity, and vehicle type.

### HTTP Method

`POST`

### Request Body
The request body should be a JSON object with the following properties:

- `fullname`: An object containing:
  - `firstname`: A string representing the captain's first name (minimum 3 characters).
  - `lastname`: A string representing the captain's last name (minimum 3 characters).
- `email`: A string representing the captain's email (must be a valid email address).
- `password`: A string representing the captain's password (minimum 6 characters).
- `vehicle`: An object containing:
  - `color`: A string representing the vehicle's color.
  - `plate`: A string representing the vehicle's plate number.
  - `capacity`: A number representing the vehicle's capacity.
  - `vehicleType`: A string representing the vehicle's type.

### Response
- `201 Created`: The captain was successfully created. The response will include a JSON object with the captain's details.
- `400 Bad Request`: The request was invalid. The response will include a JSON object with an array of error messages.

### Example Request
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "Sedan"
  }
}
```

### Example Response
```json
{
  "captain": {
    "_id": "60d0fe4f5311236168a109cb",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "Sedan"
    }
  }
}
```

# Captain Login Endpoint

## POST /captains/login

### Description
This endpoint is used to log in an existing captain. It requires the captain's email and password.

### HTTP Method  

`POST`

### Request Body
The request body should be a JSON object with the following properties:

- `email`: A string representing the captain's email (must be a valid email address).
- `password`: A string representing the captain's password (minimum 6 characters).

### Response
- `200 OK`: The captain was successfully logged in. The response will include a JSON object with the captain's token and captain details.
- `400 Bad Request`: The request was invalid. The response will include a JSON object with an array of error messages.
- `401 Unauthorized`: The email or password was incorrect.

### Example Request
```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d0fe4f5311236168a109cb",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "Sedan"
    }
  }
}
```

# Captain Profile Endpoint

## GET /captains/profile

### Description
This endpoint is used to get the profile of the logged-in captain. It requires the captain to be authenticated.

### HTTP Method  

`GET`

### Response
- `200 OK`: The captain's profile was successfully retrieved. The response will include a JSON object with the captain's details.
- `401 Unauthorized`: The captain is not authenticated.

### Example Response
```json
{
  "captain": {
    "_id": "60d0fe4f5311236168a109cb",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "Sedan"
    }
  }
}
```

# Captain Logout Endpoint

## GET /captains/logout

### Description
This endpoint is used to log out the authenticated captain.

### HTTP Method  

`GET`

### Response
- `200 OK`: The captain was successfully logged out. The response will include a JSON object with a success message.
- `401 Unauthorized`: The captain is not authenticated.

### Example Response
```json
{
  "message": "Logout successfully"
}
```
