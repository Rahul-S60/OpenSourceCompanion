# OpenSource Companion

A gamified web app to help beginners contribute to open source projects.

## Setup Instructions

1. **Clone the Repo**
   ```bash```
   -git clone https://github.com/prajwalMangaji/OpenSourceCompanion.git
   -cd OpenSourceCompanion

2. **Backend Setup**
    -cd backend
    Install dependencies: -npm install
    Create .env file: copy and paste the content from .env.example file
    Start server: -npm run dev (runs on http://localhost:5000)

3. **Frontend Setup**
    -cd frontend
    Install dependencies: -npm install
    Start server: npm start (runs on http://localhost:3000)

4. **Verify**
    Backend(in bash termianl): -curl http://localhost:5000/api/test (should return {"message":"Backend alive!"})
    Frontend: Open http://localhost:3000 (should show "OpenSource Companion")

5. **Project Structure**
    frontend/: React app (UI)
    backend/: Node.js/Express app (API, DB)
    docs/: Future docs/wireframes

6. **Features (Planned)**
    User authentication
    Profile setup (languages, skills)
    Issue recommendations
    Contribution tracking
    Gamification (points, leaderboards)

7. **License**
    MIT