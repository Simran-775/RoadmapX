# Career Development Roadmap Generator
# RoadmapX


## 🚀 Team Information

* **Team Name:** AI Innovators
* **Team ID:** T078

## 👥 Team Members & Roles

* **Simranjeet Kaur:** Frontend Developement
* **Jasleen Kaur:** Backend Developement
* **Kritika:** API key generationa and Usage
* **Jasreet Kaur:**  Presentation 
* **Ankush Garg:** Handled all the research work


## 🎯 Problem Statement Selected
### Intelligent Recommendation System for Personalized Individual Development Plans (IDPs)
An AI-powered solution can bridge the gap between generic suggestions and effective, tailored development roadmaps. The system can perform a granular analysis of an employee's profile against the specific requirements of a target key role, identifying precise gaps in knowledge, skills (functional/geographical), and leadership abilities. By leveraging data on available projects, internal trainings, and senior leader expertise, the solution can create a dynamic, actionable, and prioritized development plan that maximizes the employee's potential and aligns with organizational needs for future leadership.

## 💡 Introduction to the Solution

The Career Development Roadmap Generator is an intelligent web application designed to empower professionals by providing personalized, quarter-wise career development roadmaps. Users submit their profile details, including known skills, available projects, leadership experience, accomplishments, and a target role. Leveraging advanced AI capabilities and LLM models, the system processes this input to generate a strategic, actionable plan for skill enhancement, project ideas, and leadership improvements, guiding them towards their desired career objective.

## ⚙️ How It Works (Behind the Scenes)

The application operates on a client-server architecture:

1.  **User Input (Frontend):** The user interacts with a React-based form where they input their details:
    * Target Role (e.g., "Software Engineer")
    * Known Skills (e.g., "Python, AI, React")
    * Available Projects (descriptions or links)
    * Leadership Experience (Yes/No)
    * Remarks (e.g., feedback received)
    * Accomplishments (e.g., "Employee of the Year")
    * Optional Resume Upload (PDF)

2.  **API Request (Frontend to Backend):** Upon form submission, the frontend (React app) sends a `POST` request to the backend API (`/submit` endpoint). This request includes all the collected data, potentially as `FormData` to handle the optional resume file.

3.  **Data Processing & Roadmap Generation (Backend):**
    * The backend receives the user's profile data.
    * It processes this information, likely feeding it into a sophisticated **Large Language Model (LLM)**.
    * The LLM analyzes the current profile against the target role, identifying gaps, relevant learning paths, and suitable project ideas.
    * It then synthesizes this analysis into a structured, quarter-wise career roadmap, formatted as a detailed text string.

4.  **API Response (Backend to Frontend):** The backend sends a JSON response back to the frontend, containing a success status and the generated roadmap text.

5.  **Roadmap Display (Frontend):**
    * The frontend receives the JSON response.
    * If successful, it updates its internal state with the received roadmap text.
    * The `RoadmapDisplay` component, located directly below the input form, then renders this text in a neatly formatted, user-friendly manner, breaking down headings and list items for readability.

## 🛠️ Tech Stack Used

* **Frontend:**
    * **React.js:** For building the dynamic user interface.
    * **`axios`:** For making HTTP requests to the backend API.
    * **`react-toastify`:** For displaying user-friendly notification messages (e.g., success/error).
    * **CSS:** For styling the components.
* **Backend:**
    * **Python - FastAPI:** 
    * **Large Language Model (LLM):** The core intelligence behind roadmap generation. (gemini-2.5-flash-preview-05-20)

## ▶️ How to Run the Program

These instructions assume you have Node.js (which includes npm/yarn) for the frontend and Python (for the backend) installed on your system.

**1. Backend Setup:**

* Navigate to your backend project directory:
    ```bash
    cd backend
    ```
* Install dependencies:
    ```bash
    pip install -r requirements.txt # Or poetry install, or npm install if Node.js backend
    ```
* Start the backend server (e.g., on port 8000):
    ```bash
    uvicorn app:app --reload
    ```
    *Ensure your backend is running on `http://localhost:8000` (default) and the `/submit` endpoint is active.*

**2. Frontend Setup:**

* Navigate to your frontend project directory:
    ```bash
    cd frontend
    ```
* Install Node.js dependencies:
    ```bash
    npm install
    # OR
    yarn install
    ```
* Start the React development server:
    ```bash
    npm start
    # OR
    yarn start
    ```
* The frontend application should now open in your browser, typically at `http://localhost:3000`.

**Usage:**

1.  Open `http://localhost:3000` in your web browser.
2.  Fill in the profile details in the form.
3.  Click "Submit Profile".
4.  The generated career roadmap will appear directly below the form on the same page.



## 🌐 External APIs Used

* **`axios`**: (Frontend) For making HTTP requests to the custom backend API.
* **`react-toastify`**: (Frontend) For displaying notifications.
* **Google Gemini API:** (Backend) Utilizing the `gemini-2.5-flash-preview-05-20` model for generating personalized career roadmaps.
