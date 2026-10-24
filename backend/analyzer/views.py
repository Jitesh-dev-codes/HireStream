import os
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Candidate
import PyPDF2
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class ResumeUploadView(APIView):
    def post(self, request):
        files = request.FILES.getlist('resumes')
        req_skills = request.data.get('skills', '')

        if not files:
            return Response({'error': 'No files uploaded'}, status=400)

        results = []
        model = genai.GenerativeModel('gemini-3.5-flash-lite')

        for file in files:
            reader = PyPDF2.PdfReader(file)
            resume_text = "".join(page.extract_text() for page in reader.pages if page.extract_text())

            prompt = f"""Evaluate this resume against the required skills: {req_skills}.
            Resume text: {resume_text}
            Extract the candidate's name, email, calculate a match score (0-100), and write a short 1-2 line reason explaining why they match or what required skills are missing.
            Return strictly a JSON object exactly like this: {{"name": "extracted name", "email": "extracted email", "score": 85, "reason": "Strong in Python, but lacks DSA experience."}}"""

            try:
                response = model.generate_content(prompt)
                clean_text = response.text.strip().replace('```json', '').replace('```', '')
                data = json.loads(clean_text)
                
                candidate = Candidate.objects.create(
                    name=data.get('name', file.name),
                    email=data.get('email', 'Not found'),
                    resume=file,
                    score=data.get('score', 0),
                    reason=data.get('reason', 'No remarks.')
                )
                
                results.append({
                    'id': candidate.id,
                    'name': candidate.name,
                    'email': candidate.email,
                    'score': candidate.score,
                    'reason': candidate.reason
                })
            except Exception as e:
                print(f"Failed to process {file.name}: {e}")

        results = sorted(results, key=lambda x: x['score'], reverse=True)
        return Response({'candidates': results, 'status': 'success'})