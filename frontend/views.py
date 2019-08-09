from django.shortcuts import render

from planner.settings import on_heroku


def index(request):
    return render(request, "frontend/index.html", {'on_heroku': on_heroku})
