# Wanderlust - Travel Planning App

![Wanderlust](https://img.shields.io/badge/Wanderlust-Travel%20App-blue.svg)


## Table of Contents
- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## About the Project
Wanderlust is a full-stack travel planning web application that allows users to explore, create, and review travel destinations. With features like authentication, image uploads, and interactive maps, it provides a seamless experience for travelers.

---

## Key Features
- **User Authentication**: Secure login and signup using Passport.js.
- **Listings Management**: Users can create, edit, and delete travel listings.
- **Reviews & Ratings**: Users can leave feedback on destinations.
- **Image Uploads**: Cloudinary integration for efficient image storage and delivery.
- **Map Integration**: Interactive maps powered by Mapbox.
- **Responsive UI**: Built with Bootstrap for a mobile-friendly experience.

---

## Technologies Used

| Category | Technologies |
|----------|-------------|
| Backend  | Node.js, Express, MongoDB |
| Frontend | EJS, Bootstrap |
| Authentication | Passport.js (Local Strategy) |
| Cloud Storage | Cloudinary |
| Maps API | Mapbox |

---

## Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/wasiahamad
/wanderlust.git
   cd wanderlust
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file and add:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   MAPBOX_TOKEN=your_mapbox_token
   ```

4. **Run the Application**
   ```sh
   npm start
   ```

---

## Usage
- Sign up or log in to your account.
- Browse or create travel listings with descriptions and images.
- Add reviews and ratings to existing listings.
- View locations on an interactive map.

---

## API Reference
- **GET /listings** - Retrieve all travel listings.
- **POST /listings** - Create a new listing (Authenticated users only).
- **PUT /listings/:id** - Update a listing (Listing owner only).
- **DELETE /listings/:id** - Remove a listing (Listing owner only).
- **POST /reviews/:listingId** - Add a review.

---

## Environment Variables
| Variable | Description |
|----------|-------------|
| CLOUDINARY_CLOUD_NAME | Cloudinary account cloud name |
| CLOUDINARY_API_KEY | API key for Cloudinary |
| CLOUDINARY_API_SECRET | API secret for Cloudinary |
| MAPBOX_TOKEN | API token for Mapbox |

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

---

## License
This project is licensed under the MIT License.

---

## Acknowledgements
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Mapbox](https://www.mapbox.com/)
- [Passport.js](http://www.passportjs.org/)
