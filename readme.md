# MedSafe Cycle API

Medsafe Cycle is an API designed to support an app that scans and categorizes medical waste, ensuring proper disposal and management. It functions as the API for my Bangkit Academy team's capstone project, Medsafe-Cycle—a mobile app crafted to aid healthcare professionals in classifying medical waste for appropriate treatment based on its type. The app utilizes the mobile camera to capture images of the waste, automatically identifying and categorizing its type. The API provides endpoints for user registration, login, waste data upload, and retrieval of categorized waste information.

## Features

- **User Registration & Login**: Secure authentication using JWT.
- **Medical Waste Categorization**: Upload medical waste data and categorize it using machine learning.
- **Company Data Access**: Authorized users can view registered waste management companies.
- **Waste History**: Retrieve user-specific waste upload history.
- **Profile Management**: Access personal profile details.
- **Secure Waste Management**: Only authorized users can delete waste entries.

## Technologies

- **Backend**: Node.js, Hapi.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **File Storage**: Google Cloud Storage
- **Machine Learning**: [API integration](https://github.com/firdh0/Medsafe-Cycle) for waste categorization

## API Endpoints

### User Management

| Method | Endpoint        | Description             | Authentication |
|--------|-----------------|-------------------------|----------------|
| POST   | `/register`      | Register a new user      | No             |
| POST   | `/login`         | Log in an existing user  | No             |
| GET    | `/myprofile`     | Retrieve user profile    | JWT Token      |

### Company Data

| Method | Endpoint        | Description                          | Authentication |
|--------|-----------------|--------------------------------------|----------------|
| GET    | `/companies`     | Get a list of waste management companies | JWT Token      |

### Waste Management

| Method  | Endpoint                 | Description                        | Authentication |
|---------|--------------------------|------------------------------------|----------------|
| POST    | `/upload`                 | Upload waste data for categorization | JWT Token      |
| GET     | `/history/{size}/{offset}`| Get waste upload history           | JWT Token      |
| GET     | `/wastes/{waste_id}`      | Get waste details by ID            | JWT Token      |
| DELETE  | `/wastes/{waste_id}`      | Delete waste entry by ID           | JWT Token |

### Miscellaneous

| Method | Endpoint | Description             | Authentication |
|--------|----------|-------------------------|----------------|
| GET    | `/`      | Test the API connection | No             |

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/amryyahya/medsafe-cycle-api.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the root directory and google cloud configuration on config folder:

4. Start the server:
    ```bash
    npm start
    ```

5. Access the API at `http://localhost:8080`.

## Usage

- **Register a user**: Send a POST request to `/register` with `name`, `email`, `password`, `address`, and `type` (user or admin).
- **Log in**: Send a POST request to `/login` with `email` and `password` to receive a JWT token.
- **Upload waste**: After logging in, send a POST request to `/upload` with a file (waste image) to classify the waste.

## Database Schema

### Users

| Column       | Type     |
|--------------|----------|
| user_id      | INT      |
| user_name    | VARCHAR  |
| user_email   | VARCHAR  |
| user_password| VARCHAR  |
| user_address | VARCHAR  |
| user_type    | ENUM (0 = User, 1 = Company) |

### Waste

| Column      | Type     |
|-------------|----------|
| waste_id    | INT      |
| user_id     | INT      |
| waste_type  | VARCHAR  |
| image_link  | VARCHAR  |

### WasteType

| Column        | Type     |
|---------------|----------|
| waste_type_id | INT      |
| name          | VARCHAR  |

