# ✨ Life Journey Tracker

<p align="center">
  A full-stack web application designed to help you map, reflect on, and understand your life's journey through goals, journeys, obstacles, and emotions.
</p>

<p align="center">
  <em>(Your screenshot here)</em>
</p>

---

## 📌 About The Project

**Life Journey Tracker** is a web application that helps users map their life's journey by documenting:

*   **Goals** (life aspirations)
*   **Journeys** (the steps taken towards a goal)
*   **Obstacles** (the challenges that arise in each step)
*   **Emotions** (the emotional reactions to those challenges)

This application serves as a medium for self-reflection and personal growth tracking, allowing users to see their progress, identify recurring patterns of obstacles, and understand the dominant emotions that influence their development.

### 🚀 Built With

This project is built with a modern, full-stack technology set:

| Backend                               | Frontend                            | Database        |
| ------------------------------------- | ----------------------------------- | --------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white) | |

---

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or newer recommended)
*   [pnpm](https://pnpm.io/) (or `npm`/`yarn`)
*   [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

### ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://your-repository-url.com/life-journey.git
    cd life-journey
    ```

2.  **Setup the Backend:**
    ```sh
    cd backend
    pnpm install
    ```
    Create a `.env` file by copying the example:
    ```sh
    cp .env.example .env
    ```
    Edit the `.env` file with your database credentials. **Remember to URL-encode special characters in your password!**

3.  **Setup the Frontend:**
    ```sh
    cd ../frontend
    pnpm install
    ```

### 🏃 Running the Application

1.  **Start the Database:**
    From the root directory (`life-journey/`), run Docker Compose to start the PostgreSQL database container.
    ```sh
    docker-compose up -d
    ```

2.  **Run Database Migrations:**
    Navigate to the backend directory and run the Prisma migration to set up the database tables.
    ```sh
    cd backend
    pnpm exec prisma migrate dev
    ```

3.  **Start the Backend Server:**
    In the `backend` directory:
    ```sh
    pnpm run dev
    ```
    The backend server will be running on `http://localhost:5000`.

4.  **Start the Frontend Development Server:**
    In a new terminal, navigate to the `frontend` directory:
    ```sh
    cd frontend
    pnpm run dev
    ```
    The frontend application will be available at `http://localhost:5173`.

---

## ✨ Features

*   **User Authentication**: Secure user registration and login using JWT.
*   **Modern Dashboard**: A clean, responsive dashboard summarizing your entire journey.
*   **Unified CRUD Management**:
    *   Create, Read, Update, and Delete Goals.
    *   Expand Goals to manage the Journeys within them.
    *   Expand Journeys to manage the Obstacles encountered.
    *   Expand Obstacles to log and manage the Emotions felt.
*   **Modal-Driven UI**: A seamless user experience using modals for creating and editing entries.

---

## 📡 API Endpoints

| Method | Endpoint                             | Description                             |
| ------ | ------------------------------------ | --------------------------------------- |
| `POST` | `/auth/register`                     | Register a new user                     |
| `POST` | `/auth/login`                        | Login a user                            |
| `GET`  | `/tokoh/me`                          | Get the current user's profile          |
| `PUT`  | `/tokoh/me`                          | Update the user's profile               |
| `GET`  | `/tujuan`                            | Get all goals for the user              |
| `POST` | `/tujuan`                            | Create a new goal                       |
| `PUT`  | `/tujuan/:id`                        | Update a specific goal                  |
| `DELETE`| `/tujuan/:id`                        | Delete a specific goal                  |
| `POST` | `/tujuan/:tujuanId/perjalanan`       | Create a new journey for a goal         |
| `GET`  | `/tujuan/:tujuanId/perjalanan`       | Get all journeys for a goal             |
| `PUT`  | `/perjalanan/:id`                    | Update a specific journey               |
| `DELETE`| `/perjalanan/:id`                    | Delete a specific journey               |
| `GET`  | `/dashboard/stats`                   | Get aggregated dashboard statistics     |
| *...and more for Obstacles and Emotions.*    |                                          |                                         |


---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
