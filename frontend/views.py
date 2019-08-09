from django.shortcuts import render
from planner.settings import DEVELOPMENT


def index(request):
    dev = DEVELOPMENT
    return render(request, "frontend/index.html", {'dev': dev})
