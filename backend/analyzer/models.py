from django.db import models

class Candidate(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    resume = models.FileField(upload_to='resumes/')
    score = models.IntegerField(default=0)
    reason = models.TextField(default='')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name