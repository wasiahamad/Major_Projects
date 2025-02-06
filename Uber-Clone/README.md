# Uber-Clone Project

## Overview
The `uber-clone` project is a full-stack application that replicates the core functionalities of the Uber app. It includes features such as user authentication, ride booking, payment processing, and driver tracking. The project is built using modern web technologies and follows best practices for code organization and testing.


## How to Clone This Repository
To clone this repository, follow these steps:

1. **Open your terminal or command prompt**: This is where you will run the commands to clone and set up the repository.
2. **Navigate to the directory where you want to clone the repository**: Use the `cd` command to change directories.
3. **Run the following command**: This command will clone the repository to your local machine.
   ```bash
   git clone https://github.com/wasiahamad/uber-clone.git
   ```
4. **Navigate into the cloned repository**: Change into the directory of the cloned repository.
   ```bash
   cd uber-clone
   ```
5. **Install the dependencies for both the backend and frontend**: This will install all the necessary packages for the project.
   ```bash
   cd Backend
   npm install
   cd ../frontend
   npm install
   ```
6. **Create a `.env` file in both the `Backend` and `frontend` directories**: Add the necessary environment variables as specified in the respective `README.md` files.
7. **Start the backend server**: This will start the backend server.
   ```bash
   cd Backend
   npm start
   ```
8. **Start the frontend development server**: This will start the frontend development server.
   ```bash
   cd ../frontend
   npm run dev
   ```

You should now have the `uber-clone` project running locally on your machine.

## Project Structure
The project is organized into two main directories: `Backend` and `frontend`. Each directory contains the necessary files and subdirectories for the respective part of the application.

```
Uber-Clone/
├── Backend/
│   ├── .env
│   ├── app.js
│   ├── controllers/
│   │   ├── captain.controller.js
│   │   ├── map.controller.js
│   │   ├── ride.controller.js
│   │   └── user.controller.js
│   ├── db/
│   │   └── db.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── blackListToken.model.js
│   │   ├── captain.model.js
│   │   ├── ride.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── captain.routes.js
│   │   ├── maps.routes.js
│   │   ├── ride.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── maps.service.js
│   │   └── ride.service.js
│   ├── socket.js
│   ├── test/
│   │   └── test.js
│   ├── package.json
│   ├── README.md
│   └── server.js
└── frontend/
    ├── .env
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── public/
    ├── README.md
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── CaptainDetails.jsx
    │   │   ├── ConfirmRide.jsx
    │   │   ├── FinishRide.jsx
    │   │   ├── LiveTracking.jsx
    │   │   ├── LocationSearchPanel.jsx
    │   │   ├── LookingForDriver.jsx
    │   │   ├── RidePopUp.jsx
    │   │   ├── VehiclePanel.jsx
    │   │   └── WaitingForDriver.jsx
    │   ├── context/
    │   │   ├── CaptainContext.jsx
    │   │   ├── SocketContext.jsx
    │   │   └── UserContext.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── pages/
    │   │   ├── CaptainHome.jsx
    │   │   ├── CaptainLogin.jsx
    │   │   ├── CaptainRiding.jsx
    │   │   ├── CaptainSignup.jsx
    │   │   ├── Home.jsx
    │   │   ├── Riding.jsx
    │   │   ├── Start.jsx
    │   │   ├── UserLogin.jsx
    │   │   ├── UserLogout.jsx
    │   │   ├── UserProtectWrapper.jsx
    │   │   ├── UserSignup.jsx
    │   │   └── CaptainProtectWrapper.jsx
    │   └── tailwind.config.js
    └── vite.config.js
```

## Backend

### Technologies and Tools
- **Node.js**: A JavaScript runtime environment that allows you to run JavaScript on the server-side.
- **Express.js**: A web framework for Node.js that simplifies the process of building web applications and APIs.
- **Mongoose**: An object modeling tool for MongoDB, which provides a schema-based solution to model your application data.
- **JWT**: JSON Web Tokens are used for securely transmitting information between parties as a JSON object.
- **bcrypt**: A library for hashing passwords, ensuring that user passwords are stored securely.
- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`.
- **socket.io**: A library that enables real-time, bidirectional communication between web clients and servers.
- **axios**: A promise-based HTTP client for making requests to APIs.
- **express-validator**: A set of express.js middlewares that wraps validator.js functions.
- **cors**: A middleware for enabling Cross-Origin Resource Sharing.
- **cookie-parser**: A middleware for parsing cookies attached to the client request object.

### Routes
Routes define the endpoints of your application and how they respond to client requests.

#### User Routes (`user.routes.js`)
- `/register`: Endpoint to register a new user.
- `/login`: Endpoint to login a user.
- `/profile`: Endpoint to get user profile information.
- `/logout`: Endpoint to logout a user.

#### Captain Routes (`captain.routes.js`)
- `/register`: Endpoint to register a new captain.
- `/login`: Endpoint to login a captain.
- `/profile`: Endpoint to get captain profile information.
- `/logout`: Endpoint to logout a captain.

#### Map Routes (`maps.routes.js`)
- `/get-coordinates`: Endpoint to get coordinates of an address.
- `/get-distance-time`: Endpoint to get distance and time between two locations.
- `/get-suggestions`: Endpoint to get autocomplete suggestions for a place.

#### Ride Routes (`ride.routes.js`)
- `/create`: Endpoint to create a new ride.
- `/get-fare`: Endpoint to get fare for a ride.
- `/confirm`: Endpoint to confirm a ride.
- `/start-ride`: Endpoint to start a ride.
- `/end-ride`: Endpoint to end a ride.

### Models
Models define the structure of your data and provide an interface to interact with the database.

- **User Model** (`user.model.js`): Defines the schema for user data.
- **Captain Model** (`captain.model.js`): Defines the schema for captain data.
- **Ride Model** (`ride.model.js`): Defines the schema for ride data.
- **Blacklist Token Model** (`blackListToken.model.js`): Defines the schema for blacklisted tokens.

### Controllers
Controllers handle the logic for each route and interact with the models to perform CRUD operations.

- **User Controller** (`user.controller.js`): Handles user-related operations.
- **Captain Controller** (`captain.controller.js`): Handles captain-related operations.
- **Map Controller** (`map.controller.js`): Handles map-related operations.
- **Ride Controller** (`ride.controller.js`): Handles ride-related operations.

### Services
Services contain the business logic and are used by controllers to perform specific tasks.

- **Map Service** (`maps.service.js`): Contains logic for interacting with map APIs.
- **Ride Service** (`ride.service.js`): Contains logic for managing rides.

### Middleware
Middleware functions are used to process requests before they reach the route handlers.

- **Auth Middleware** (`auth.middleware.js`): Handles authentication and authorization.

### Socket
Socket-related code for real-time communication.

- **Socket Initialization and Messaging** (`socket.js`): Initializes socket.io and handles real-time messaging.

### NPM Packages
A list of npm packages used in the backend.

- `@mapbox/mapbox-sdk`
- `axios`
- `bcrypt`
- `cookie-parser`
- `cors`
- `dotenv`
- `express`
- `express-validator`
- `jsonwebtoken`
- `mongoose`
- `socket.io`

## Frontend

### Technologies and Tools
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A next-generation front-end tooling that provides a fast development environment.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Socket.io-client**: A client library for socket.io, enabling real-time communication.
- **axios**: A promise-based HTTP client for making requests to APIs.
- **react-router-dom**: A library for declarative routing in React applications.
- **GSAP**: A JavaScript animation library for creating high-performance animations.
- **Mapbox GL**: A library for interactive, customizable maps.

### Components
Components are reusable UI elements that make up the frontend of the application.

- **CaptainDetails** (`CaptainDetails.jsx`): Displays details about the captain.
- **ConfirmRide** (`ConfirmRide.jsx`): Allows users to confirm a ride.
- **FinishRide** (`FinishRide.jsx`): Displays the ride completion screen.
- **LiveTracking** (`LiveTracking.jsx`): Shows real-time tracking of the ride.
- **LocationSearchPanel** (`LocationSearchPanel.jsx`): Allows users to search for locations.
- **LookingForDriver** (`LookingForDriver.jsx`): Displays a screen while searching for a driver.
- **RidePopUp** (`RidePopUp.jsx`): Shows ride-related pop-ups.
- **VehiclePanel** (`VehiclePanel.jsx`): Displays vehicle options.
- **WaitingForDriver** (`WaitingForDriver.jsx`): Displays a screen while waiting for a driver.

### Pages
Pages are the main views of the application.

- **CaptainHome** (`CaptainHome.jsx`): Home page for captains.
- **CaptainLogin** (`CaptainLogin.jsx`): Login page for captains.
- **CaptainRiding** (`CaptainRiding.jsx`): Riding page for captains.
- **CaptainSignup** (`CaptainSignup.jsx`): Signup page for captains.
- **Home** (`Home.jsx`): Home page for users.
- **Riding** (`Riding.jsx`): Riding page for users.
- **Start** (`Start.jsx`): Starting page of the application.
- **UserLogin** (`UserLogin.jsx`): Login page for users.
- **UserLogout** (`UserLogout.jsx`): Logout page for users.
- **UserProtectWrapper** (`UserProtectWrapper.jsx`): Wrapper component for protected user routes.
- **UserSignup** (`UserSignup.jsx`): Signup page for users.
- **CaptainProtectWrapper** (`CaptainProtectWrapper.jsx`): Wrapper component for protected captain routes.

### Context
Context providers are used to manage global state in the frontend.

- **CaptainContext** (`CaptainContext.jsx`): Provides state management for captain-related data.
- **SocketContext** (`SocketContext.jsx`): Provides state management for socket-related data.
- **UserContext** (`UserContext.jsx`): Provides state management for user-related data.

### NPM Packages
A list of npm packages used in the frontend.

- `@gsap/react`
- `@react-google-maps/api`
- `axios`
- `gsap`
- `mapbox-gl`
- `react`
- `react-dom`
- `react-map-gl`
- `react-router-dom`
- `remixicon`
- `socket.io-client`
- `@eslint/js`
- `@types/react`
- `@types/react-dom`
- `@vitejs/plugin-react`
- `autoprefixer`
- `eslint`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `globals`
- `postcss`
- `tailwindcss`
- `vite`

## Summary
- **Backend**: Built with Node.js, Express.js, Mongoose, JWT, bcrypt, dotenv, socket.io, axios, express-validator, cors, and cookie-parser.
- **Frontend**: Built with React, Vite, Tailwind CSS, socket.io-client, axios, react-router-dom, GSAP, and Mapbox GL.
- **Routes**: 4 main route files with multiple endpoints for users, captains, maps, and rides.
- **Models**: 4 main models for users, captains, rides, and blacklisted tokens.
- **Controllers**: 4 main controllers for handling user, captain, map, and ride operations.
- **Services**: 2 main services for maps and rides.
- **Middleware**: Authentication middleware for users and captains.
- **Socket**: Real-time communication setup with socket.io.
- **Components**: Multiple React components for various UI elements.
- **Pages**: Multiple React pages for different views and functionalities.
- **Context**: Context providers for managing global state in the frontend.

## How to Contribute
We welcome contributions to the `uber-clone` project! To contribute, follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page to create a copy of the repository on your GitHub account.
2. **Clone the Forked Repository**: Clone the forked repository to your local machine.
   ```bash
   git clone https://github.com/wasiahamad/uber-clone.git
   ```
3. **Create a New Branch**: Create a new branch for your feature or bug fix.
   ```bash
   git checkout -b feature-or-bugfix-name
   ```
4. **Make Your Changes**: Make your changes to the codebase.
5. **Commit Your Changes**: Commit your changes with a descriptive commit message.
   ```bash
   git add .
   git commit -m "Description of the feature or bug fix"
   ```
6. **Push Your Changes**: Push your changes to your forked repository.
   ```bash
   git push origin feature-or-bugfix-name
   ```
7. **Create a Pull Request**: Go to the original repository on GitHub and create a pull request from your forked repository. Provide a clear description of your changes and any related issues.

We will review your pull request and provide feedback. Once approved, your changes will be merged into the main repository.

Thank you 💗 for contributing!

