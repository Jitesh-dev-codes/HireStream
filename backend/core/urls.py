from django.contrib import admin
from django.urls import path

from analyzer.views import ResumeUploadView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/upload/', ResumeUploadView.as_view(), name='resume_upload'),
]
