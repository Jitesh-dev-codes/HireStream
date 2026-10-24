# HireStream ATS

A lightweight Applicant Tracking System (ATS) designed to streamline resume screening. It evaluates bulk resume uploads against specified job requirements and ranks candidates based on skill matches.

**Key Features**
* Bulk Resume Processing: Upload multiple PDF resumes simultaneously.
* Automated Scoring: Calculates a match percentage based on the target job skills.
* Insightful Remarks: Highlights matched skills and points out missing requirements for each candidate.
* Clean Dashboard: Instantly view ranked candidates with extracted names and emails.

**Tech Stack**
* Backend: Django, Django REST Framework, PyPDF2
* Frontend: React.js, Vite, Axios
* AI Integration: Google Gemini API

**Local Setup**
1. Clone the repository.
2. Navigate to the `backend` folder, create a virtual environment, and install dependencies (`django`, `djangorestframework`, `pypdf2`, `python-dotenv`, `google-generativeai`, `django-cors-headers`).
3. Add your Gemini API key in `backend/.env` as `GEMINI_API_KEY=your_key`.
4. Run `python manage.py migrate` followed by `python manage.py runserver`.
5. In a separate terminal, navigate to the `frontend` folder, run `npm install`, and start the client with `npm run dev`.