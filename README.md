# Zip Code Application

Web application that autofills address details based on ZIP code input, powered by the Canada Post API

# Application Name

This project contains a **Next.js** frontend and an **Express.js** backend. It demonstrates a full-stack application
where the frontend communicates with the backend for address-related queries.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** or **yarn** (for managing dependencies)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Volodarskyi/zip-code
    cd zip-code
    ```

2. **Install dependencies** for both the client (Next.js) and server (Express.js):

   **For the client (Next.js)**:
    ```bash
    cd client
    npm install
    # or
    yarn install
    ```

   **For the server (Express.js)**:
    ```bash
    cd ../server
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables**:

   Create a `.env` file in the **../server** and add the necessary environment variables for server.

    - For the **server**, add your server configuration and API key:
    ```ini
    # .env (server)
    SERVER_PORT=port
    CANADIAN_API_KEY=your_canadian_api_key_here
    ```

## Running the Application

1. **Start the server** (Express.js):

   From the **server** directory:
    ```bash
    cd server
    npm run dev
    # or
    yarn dev
    ```

   This will start the Express.js server on port 5001 (or the port specified in `.env`).

2. **Start the client** (Next.js):

   From the **client** directory:
    ```bash
    cd client
    npm run dev
    # or
    yarn dev
    ```

   This will start the Next.js frontend on port 3000.

3. **Access the application**:

    - Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.
    - The client will communicate with the server running on [http://localhost:5001](http://localhost:5001).

