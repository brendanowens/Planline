from eav.models import Attribute, Value
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken

from backend.models import PlannerClientConfig, Vendor, VendorType
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, PlannerClientConfigSerializer, \
    VendorSerializer, AttributeSerializer, AttributeValueSerializer, VendorTypeSerializer


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
        permissions.IsAuthenticated
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
