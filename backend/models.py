import eav
from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django_countries.fields import CountryField
from eav.decorators import register_eav
from eav.models import Attribute
from eav.registry import EavConfig
from polymorphic.models import PolymorphicModel
from solo.models import SingletonModel
from phone_field import PhoneField


class PlannerClientConfig(SingletonModel):
    company_bio = models.TextField(max_length=200)
    primary_color = models.CharField(max_length=7, default="#38513E")
    secondary_color = models.CharField(max_length=7, default="#01101E")
    favicon = models.ImageField(null=True)

    def __unicode__(self):
        return u"Site Configuration"

    class Meta:
        verbose_name = "Site Configuration"


class Contact(PolymorphicModel):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = PhoneField(null=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class Client(models.Model):
    name = models.CharField(max_length=50)  # don't actually need this field, name should go on project


class Project(models.Model):
    name = models.CharField(max_length=50)
    expected_completion_date = models.DateField()
    completed = models.BooleanField(default=False)

    def completed_display(self):
        return str(self.completed)

    def days_until_completion(self):
        days = (self.expected_completion_date - timezone.now().date()).days
        return days


class ProjectContact(Contact):
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, related_name='project_contacts')


class Address(models.Model):
    address_line_1 = models.CharField(max_length=95)
    address_line_2 = models.CharField(max_length=95, null=True, blank=True)
    city = models.CharField(max_length=35)
    state = models.CharField(max_length=35)
    country = CountryField()

    def __str__(self):
        return self.address_line_1 + (
            ', ' + self.address_line_2 if self.address_line_2 is not None else '') + ' ' + self.city + ', ' + self.state + ', ' + str(
            self.country)


class VendorType(models.Model):
    name = models.CharField(max_length=75, unique=True)

    def __str__(self):
        return self.name

    def create_attribute(self, name, data_type):
        return Attribute.objects.create(name=name,
                                        slug="vendortype_" + slugify(self.name).replace('-', '_') + "_" + slugify(
                                            name).replace('-', '_'), datatype=data_type)

    def get_vendor_attributes(self):
        return Attribute.objects.filter(
            slug__startswith="vendortype_" + slugify(self.name).replace('-', '_'))

    @property
    def number_of_attributes(self):
        return self.get_vendor_attributes().count()


@register_eav()
class Vendor(models.Model):
    added_by = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    name = models.CharField(max_length=50, null=True)
    type = models.ForeignKey(VendorType, on_delete=models.SET_NULL, null=True)
    address = models.ForeignKey(Address, models.PROTECT, null=True)

    def __str__(self):
        return self.name

    def get_vendor_attributes(self):
        return self.eav.get_all_attributes().filter(
            slug__startswith="vendortype_" + slugify(self.type.name).replace('-', '_'))

    def get_vendor_attribute_slugs(self):
        return [attribute.slug for attribute in self.get_vendor_attributes()]

    def get_vendor_attribute_field_names(self):
        return ["eav." + slug for slug in self.get_vendor_attribute_slugs()]

    def get_attribute_values(self):
        return self.eav.get_values()

    @classmethod
    def get_attributes(cls):
        return Attribute.objects.filter(slug__startswith="vendortype_")


class VendorContact(Contact):
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True, related_name='vendor_contacts')
