from eav.models import Attribute, Value
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User Serializer
from backend.models import PlannerClientConfig, Vendor, VendorType, Address, Contact, Project, ProjectContact, \
    TaskCategory, ProjectTemplate, Task, TemplateTask, ProjectTask


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        else:
            raise serializers.ValidationError('Incorrect Credentials')


# PlannerClientConfig Serializer
class PlannerClientConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlannerClientConfig
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    full_address = serializers.CharField(source='__str__', read_only=True)

    class Meta:
        model = Address
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        exclude = ['polymorphic_ctype', ]


class AttributeSerializer(serializers.ModelSerializer):
    datatype_display = serializers.CharField(source='get_datatype_display', read_only=True)

    class Meta:
        model = Attribute
        fields = ['id', 'datatype', 'name', 'datatype_display', ]
        extra_kwargs = {
            'id': {
                'read_only': False,
                'required': False
            }
        }


class AttributeValueSerializer(serializers.ModelSerializer):
    value = serializers.ReadOnlyField()
    attribute = AttributeSerializer()

    class Meta:
        model = Value
        fields = ['id', 'value', 'attribute', ]


class VendorTypeSerializer(serializers.ModelSerializer):
    attributes = AttributeSerializer(many=True, source='get_vendor_attributes')
    number_of_attributes = serializers.IntegerField(read_only=True)

    class Meta:
        model = VendorType
        fields = '__all__'

    def create(self, validated_data):
        vendor_type = VendorType.objects.create(name=validated_data['name'])
        for item in validated_data['get_vendor_attributes']:
            vendor_type.create_attribute(name=item['name'], data_type=item['datatype'])
        return vendor_type

    def update(self, instance, validated_data):
        instance.name = validated_data['name']
        instance.save()

        attribute_ids = []
        for attribute in validated_data['get_vendor_attributes']:
            try:
                attribute_id = attribute['id']
            except KeyError:
                attribute_obj = instance.create_attribute(name=attribute['name'], data_type=attribute['datatype'])
                attribute_ids.append(attribute_obj.id)
                continue
            attribute_ids.append(attribute_id)
            try:
                attribute_obj = Attribute.objects.get(pk=attribute_id)
                attribute_obj.name = attribute['name']
                attribute_obj.datatype = attribute['datatype']
                attribute_obj.save()
            except Attribute.DoesNotExist:
                instance.create_attribute(name=attribute['name'], data_type=attribute['datatype'])

        for attribute in instance.get_vendor_attributes():
            if attribute.id not in attribute_ids:
                attribute.delete()
        return instance


class VendorSerializer(serializers.ModelSerializer):
    vendor_contacts = ContactSerializer(many=True, required=False)
    type = VendorTypeSerializer(required=False)
    type_id = serializers.PrimaryKeyRelatedField(required=False, queryset=VendorType.objects.all())
    address = AddressSerializer()
    attributes = AttributeSerializer(many=True, source='get_vendor_attributes', required=False)
    attribute_values = AttributeValueSerializer(many=True, source='get_attribute_values', required=False)

    class Meta:
        model = Vendor
        fields = '__all__'

    def create(self, validated_data):
        # Does not create vendor contacts
        # Does not create attributes or attribute values
        address_dict = validated_data.pop('address')
        address, created = Address.objects.get_or_create(address_line_1=address_dict.pop('address_line_1'),
                                                         address_line_2=address_dict.pop('address_line_2', None),
                                                         city=address_dict.pop('city'),
                                                         state=address_dict.pop('state'),
                                                         country=address_dict.pop('country')
                                                         )
        vendor_type = validated_data["type_id"]
        vendor = Vendor.objects.create(name=validated_data.pop('name'), address=address, type=vendor_type,
                                       general_notes=validated_data.pop('general_notes', None))
        # if validated_data["type"] is not None:
        #     vendor_type = self.type.create(validated_data["type"])
        #     vendor.type = vendor_type
        # elif validated_data["type_id"] is not None:
        #     vendor.type = VendorType.objects.get(pk=validated_data["type_id"])
        # vendor.save()
        return vendor


class ProjectContactSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    projects = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), many=True)

    class Meta:
        model = ProjectContact
        fields = '__all__'


class TaskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCategory
        fields = '__all__'


class ProjectTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTemplate
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    due_date = serializers.CharField()
    category = TaskCategorySerializer()

    class Meta:
        model = Task
        fields = '__all__'


class TemplateTaskSerializer(TaskSerializer):
    class Meta:
        model = TemplateTask
        fields = '__all__'


class ProjectTaskSerializer(TaskSerializer):
    vendor_attachments = VendorSerializer(many=True, read_only=True)
    days_before_event_display = serializers.CharField()

    class Meta:
        model = ProjectTask
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    completed_display = serializers.ReadOnlyField()
    days_until_completion = serializers.ReadOnlyField()
    contact_list = ProjectContactSerializer(read_only=True, many=True)
    tasks = ProjectTaskSerializer(many=True, source='projecttask_set')

    class Meta:
        model = Project
        fields = '__all__'
