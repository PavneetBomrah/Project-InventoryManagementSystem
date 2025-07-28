# Inventory management system

This project implements a full-stack inventory management system, providing a web interface for managing inventory items and a backend API for data handling.

## Features

*   **Intuitive User Interface:** Built with React and Vite for a fast and responsive user experience.
*   **Smooth Animations:** Enhances user interaction with Framer Motion powered animations.
*   **Clear Visuals:** Utilizes Lucide React icons for visually appealing and recognizable elements.
*   **Robust Backend:** Handles inventory data with a Python Flask backend and interacts with a local stored file.
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

## Setup and Installation

### Prerequisites

*   Node.js (version 12.2.0 or higher)
*   npm or Yarn (for frontend package management)
*   Python (a recent Python 3 interpreter)
*   A code editor (like VS Code)

### Frontend setup

1.  **Navigate into the frontend directory:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run Frontend**
    ```bash
    npm run preview
    ```
### Backend setup

1.  **Navigate into the frontend directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    pip install pandas flask flask_cors datetime
    ```

3. **Run Frontend**
    ```bash
    py main.py
    ```
## Development


## Deployment

1.  **Create a production build of your frontend:**
    ```bash
    npm run build
    ```
2.  **Deploy your Flask backend to your chosen hosting platform (e.g., Heroku, AWS, DigitalOcean).**
    *   **Note:** The `dist` folder created by `npm run build` contains the optimized production frontend files to be served by your backend or a static file server.
3.  **Ensure your frontend is configured to communicate with the deployed backend API.**