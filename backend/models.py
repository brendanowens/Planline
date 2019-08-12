import math

from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django_countries.fields import CountryField
from eav.decorators import register_eav
from eav.models import Attribute
from polymorphic.models import PolymorphicModel
from solo.models import SingletonModel
from phone_field import PhoneField
from gm2m import GM2MField as gm2m_field


# due to a bug in django-gm2m, see https://github.com/tkhyn/django-gm2m/issues/43
class GM2MField(gm2m_field):
    def get_limit_choices_to(self):
        pass


class PlannerClientConfig(SingletonModel):
    company_bio = models.TextField(max_length=200)
    primary_color = models.CharField(max_length=7, default="#38513E")
    secondary_color = models.CharField(max_length=7, default="#01101E")
    favicon = models.ImageField(null=True)
    logo = models.ImageField(null=True)

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

    def __str__(self):
        return self.name

    def completed_display(self):
        return str(self.completed)

    def days_until_completion(self):
        days = (self.expected_completion_date - timezone.now().date()).days
        return days

    def create_project_user(self, email):
        """
        Creates a new ProjectContact object with a relation to the project
        If the user already exists, the project is added to the ProjectContact model
        :param email: email to create account using
        :return: ProjectContact object, bool: project_contact_created, bool: user_created
        """
        user, user_created = User.objects.get_or_create(username=email, email=email)
        project_contact, project_contact_created = ProjectContact.objects.get_or_create(user=user)
        project_contact.projects.add(self)
        return project_contact, project_contact_created, user_created

    @property
    def parent_tasks(self):
        return self.projecttask_set.filter(parent__isnull=True)


class ProjectContact(Contact):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    projects = models.ManyToManyField(Project, related_name='contact_list')

    def __str__(self):
        return self.user.username


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
    general_notes = models.TextField(max_length=2000, null=True, blank=True)

    # TODO add image field (probably needs to be private)

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


class ProjectTemplate(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Task(PolymorphicModel):
    name = models.CharField(max_length=200, null=True)
    days_before_event = models.IntegerField()
    # TODO add assignee (could be client or coworker)
    visible_to_client = models.BooleanField()
    note = models.TextField(max_length=500, blank=True, null=True)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='children_tasks')

    class Meta:
        ordering = ['-days_before_event']

    def __str__(self):
        return self.name

    @property
    def days_before_event_display(self):
        if self.days_before_event > 31:
            return str(int(math.ceil(self.days_before_event / 30.5))) + ' months'
        else:
            return str(self.days_before_event) + ' days'

    @property
    def children_count(self):
        return self.children_tasks.count()

    @property
    def is_child(self):
        if self.parent is not None:
            return True
        else:
            return False

    @property
    def children(self):
        return self.children_tasks.all()

    @property
    def parent_task_name(self):
        if self.parent:
            return self.parent.name
        else:
            return None


class TemplateTask(Task):
    template = models.ForeignKey(ProjectTemplate, on_delete=models.PROTECT)


class ProjectTask(Task):
    complete = models.BooleanField(default=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    vendor_attachments = models.ManyToManyField(Vendor, blank=True)
    assignee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    # TODO add contact_attachments field
    # TODO add invoice_attachments field

    @classmethod
    def create_from_task(cls, task, project):
        task.pk = None
        task_copy = task.save()
        project_task = cls(task_ptr_id=task_copy.pk)
        project_task.__dict__.update(task_copy.__dict__)
        project_task.project = project
        project_task.save()
        return project_task

    @property
    def due_date(self):
        return self.project.expected_completion_date - timezone.timedelta(days=self.days_before_event)

    @property
    def subtask_choices(self):
        return self.project.projecttask_set.all()
