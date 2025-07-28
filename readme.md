# Inventory management system

This project implements a full-stack inventory management system, providing a web interface for managing inventory items and a backend API for data handling.

## Features

*   **Intuitive User Interface:** Built with React and Vite for a fast and responsive user experience.
*   **Smooth Animations:** Enhances user interaction with Framer Motion powered animations.
*   **Clear Visuals:** Utilizes Lucide React icons for visually appealing and recognizable elements.
*   **Robust Backend:** Handles inventory data with a Python Flask backend and interacts with a database (e.g., SQLite, PostgreSQL, MySQL).
*   **Efficient Data Handling:** Uses Axios for seamless HTTP communication between the frontend and backend API.
*   **Secure Operations:** Includes features like adding, editing, and deleting inventory items, along with secure handling of data.

## Technologies

*   **Frontend:**
    *   React
    *   Vite
    *   Framer Motion
    *   Lucide React
    *   JavaScript
    *   Axios
*   **Backend:**
    *   Python Flask
*   **Database:** (Choose one based on your preference and project needs)
    *   SQLite (for local development)
    *   PostgreSQL
    *   MySQL

## Setup and Installation

### Prerequisites

*   Node.js (version 12.2.0 or higher)
*   npm or Yarn (for frontend package management)
*   Python (a recent Python 3 interpreter)
*   A code editor (like VS Code)

### Frontend setup

1.  **Navigate to the project directory:**
    ```bash
    cd project/
    ```

2.  **Create a new Vite React project:**
    ```bash
    npm create vite@latest frontend --template react
    ```

3.  **Navigate into the frontend directory:**
    ```bash
    cd frontend
    ```

4.  **Install dependencies:**
    ```bash
    npm install
    ```

5.  **Install Axios:**
    ```bash
    npm install axios
    ```

6.  **Install Framer Motion:**
    ```bash
    npm install framer-motion
    ```

7.  **Install Lucide React:**
    ```bash
    npm install lucide-react
    ```

### Backend setup

1.  **Create a backend directory:**
    ```bash
    mkdir backend && cd backend
    ```

2.  **Create a Python virtual environment:**
    *   **macOS/Linux:**
        ```bash
        python3 -m venv venv && source venv/bin/activate
        ```
    *   **Windows:**
        ```bash
        py -3 -m venv venv && .venv\Scripts\activate
        ```

3.  **Install Flask and Flask-CORS:**
    ```bash
    pip install Flask Flask-CORS
    ```

4.  **Create your Flask application file (e.g., `app.py`)**.
    *   **Note:** You'll define your API endpoints and routes within this file.

## Development

### Running the frontend

1.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
2.  Open your browser to `http://localhost:5173/`.

### Running the backend

1.  **Navigate into your backend directory:**
    ```bash
    cd backend
    ```

2.  **Activate your virtual environment (if you haven't already):**
    *   **macOS/Linux:**
        ```bash
        source venv/bin/activate
        ```
    *   **Windows:**
        ```bash
        .venv\Scripts\activate
        ```

3.  **Run the Flask application:**
    ```bash
    flask run
    ```
4.  Open your browser to `http://localhost:5000/` (or the URL your Flask app outputs).

## Deployment

1.  **Create a production build of your frontend:**
    ```bash
    npm run build
    ```
2.  **Deploy your Flask backend to your chosen hosting platform (e.g., Heroku, AWS, DigitalOcean).**
    *   **Note:** The `dist` folder created by `npm run build` contains the optimized production frontend files to be served by your backend or a static file server.
3.  **Configure environment variables for the backend (e.g., database connection strings, API keys).**
4.  **Ensure your frontend is configured to communicate with the deployed backend API.**

