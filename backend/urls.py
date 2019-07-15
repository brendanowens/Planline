from django.urls import path, include
from rest_framework import routers

from .api import RegisterAPI, LoginAPI, UserAPI, PlannerClientConfigViewSet, VendorViewSet, AttributeViewSet, \
    AttributeValueViewSet, VendorTypeViewSet
from knox import views as knox_views

router = routers.DefaultRouter()
router.register('api/config', PlannerClientConfigViewSet, 'config')
router.register('api/vendors', VendorViewSet, 'vendors')
router.register('api/vendor-types', VendorTypeViewSet, 'vendor_types')
# router.register('api/attributes', AttributeViewSet, 'attributes')
router.register('api/attribute-values', AttributeValueViewSet, 'attribute_values')

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name="knox_logout"),
]

urlpatterns += router.urls
