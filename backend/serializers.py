from eav.models import Attribute, Value
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User Serializer
from backend.models import PlannerClientConfig, Vendor, VendorType, Address, Contact


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
    full_address = serializers.CharField(source='__str__')

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
                'required': True
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

        attribute_ids = [item['id'] for item in validated_data['get_vendor_attributes']]
        for attribute in instance.get_vendor_attributes():
            if attribute.id not in attribute_ids:
                attribute.delete()

        for attribute in validated_data['get_vendor_attributes']:
            try:
                attribute_obj = Attribute.objects.get(pk=attribute['id'])
                attribute_obj.name = attribute['name']
                attribute_obj.datatype = attribute['datatype']
                attribute_obj.save()
            except Attribute.DoesNotExist:
                instance.create_attribute(name=attribute['name'], data_type=attribute['datatype'])
        return instance


class VendorSerializer(serializers.ModelSerializer):
    vendor_contacts = ContactSerializer(many=True)
    type = VendorTypeSerializer()
    address = AddressSerializer()
    attributes = AttributeSerializer(many=True, source='get_vendor_attributes')
    attribute_values = AttributeValueSerializer(many=True, source='get_attribute_values')

    class Meta:
        model = Vendor
        fields = '__all__'
