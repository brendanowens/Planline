from eav.models import Attribute, Value
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from backend.permissions import HasGroupPermission, is_in_group

from backend.models import PlannerClientConfig, Vendor, VendorType, Project, ProjectContact, \
    ProjectTemplate, Task, TemplateTask, ProjectTask, ProjectTaskNote
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, PlannerClientConfigSerializer, \
    VendorSerializer, AttributeSerializer, AttributeValueSerializer, VendorTypeSerializer, ProjectSerializer, \
    ProjectContactSerializer, ProjectTaskSerializer, TemplateTaskSerializer, TaskSerializer, ProjectTemplateSerializer, \
    ProjectTaskNoteSerializer


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)
        return Response(
            {
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token,
            }
        )


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response(
            {
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token,
            }
        )


# Get user API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


# PlannerClientConfig ViewSet
class PlannerClientConfigViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = PlannerClientConfigSerializer

    def get_queryset(self):
        return PlannerClientConfig.objects.all()


class VendorTypeViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = VendorTypeSerializer

    def get_queryset(self):
        return VendorType.objects.all()


# Vendor ViewSet
class VendorViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = VendorSerializer

    def get_queryset(self):
        return Vendor.objects.all()

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)


class AttributeViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = AttributeSerializer

    def get_queryset(self):
        return Attribute.objects.all()


class AttributeValueViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = AttributeValueSerializer

    def get_queryset(self):
        return Value.objects.all()


class ProjectContactViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ProjectContactSerializer

    def get_queryset(self):
        return ProjectContact.objects.all()


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        HasGroupPermission
    ]
    required_groups = {
        'GET': ['__all__'],
        'POST': ['Planner'],
        'PUT': ['Planner'],
    }
    serializer_class = ProjectSerializer

    def get_queryset(self):
        if is_in_group(self.request.user, 'Client'):
            return Project.objects.filter(contact_list__user=self.request.user)
        return Project.objects.all()


class ProjectTemplateViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ProjectTemplateSerializer

    def get_queryset(self):
        return ProjectTemplate.objects.all()


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.all()


class TemplateTaskViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = TemplateTaskSerializer

    def get_queryset(self):
        return TemplateTask.objects.all()


class ProjectTaskViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ProjectTaskSerializer

    def get_queryset(self):
        return ProjectTask.objects.all()


class ProjectTaskNoteViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ProjectTaskNoteSerializer

    def get_queryset(self):
        return ProjectTaskNote.objects.all()
