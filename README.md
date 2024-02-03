# Lunettes-Eyewear

## Description

An e-commerce website that sells eyewear.

The server is built with NodeJS/Express. For the client, the project is developed using React and TypeScript.
The database is built with MongoDB and the application uses Stripe as a payment solution.
Regarding design, I chose to use Material UI in combination with custom CSS. Some effects are built with Framer Motion. The application is fully responsive.

## Installation

To set up this project, follow these steps:

- Start by ensuring you have NodeJS installed. If not, install it following NodeJS documentation: https://nodejs.org/en

- Copy the repository from GitHub https://github.com/ViolaSorgato/Lunettes-Eyewear.git

- Clone the repository to your computer with the following command in the terminal. First, navigate to the folder where you want to save the project:

        git clone https://github.com/ViolaSorgato/Lunettes-Eyewear.git

- Open the project in Visual Studio Code to access the terminal directly from there.

### Keys

All keys are secret and are not included in the project or repository. The application will not work without the keys. Please contact me to retrieve them.

### Server

- After having opened the project in VSCode, open a new terminal

- Navigate to the server folder using the command:

        cd server

- Run the command:

          npm install

- Then start the server with one of the following commands:

        npm start to start the server

                or:

        npm run dev to run dependencies

- The server is now running

### Client

- Open another terminal

- Navigate to the client folder using the command:

        cd client

- Run the command:

          npm install

- When the installation is complete, run the command:

          npm run dev

The project is now up and running on localhost, and you can view the application in your browser.

### Customer Login

You need to be logged in to complete a purchase. You can register a new customer and log in afterward. Alternatively, you can use the following credentials to view orders:

- Email: violasorgato@example.com
- Password: testpassword

### Admin Login

Admin users have additional permissions as well as access to admin pages. To log in as an admin, use the following credentials:

- Email: admin@example.com
- Password: adminpassword
