from django.contrib import admin
from backend.models import PlannerClientConfig, Vendor, Address, VendorContact, VendorType, Project, ProjectContact
from solo.admin import SingletonModelAdmin
from eav.forms import BaseDynamicEntityForm
from eav.admin import BaseEntityAdmin

admin.site.register(PlannerClientConfig, SingletonModelAdmin)
admin.site.register(Address)
admin.site.register(VendorType)
admin.site.register(VendorContact)
admin.site.register(Project)
admin.site.register(ProjectContact)


class VendorAdminForm(BaseDynamicEntityForm):
    model = Vendor


class VendorAdmin(BaseEntityAdmin):
    form = VendorAdminForm


admin.site.register(Vendor, VendorAdmin)
