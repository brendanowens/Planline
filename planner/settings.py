import os
from os import getenv

import environ
import django_heroku
import dj_database_url

on_heroku = False
if 'DYNO' in os.environ:
    on_heroku = True

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODE = 'development'
if not on_heroku:
    env = environ.Env()
    environ.Env.read_env()
    SECRET_KEY = env('SECRET_KEY')
    MODE = env('SERVER_MODE')

DEBUG = MODE == 'development'
DEVELOPMENT = DEBUG

if DEVELOPMENT:
    ALLOWED_HOSTS = ['104.236.146.247', '127.0.0.1', 'localhost', 'planner.com', 'eld.planner.com',
                     'brendan.planner.com']

# Application definition

SHARED_APPS = [
    'django_tenants',
    'customers',

    'django.contrib.contenttypes',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'letsencrypt',
]

TENANT_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'webpack_loader',
    'frontend',
    'knox',
    'solo',
    'phone_field',
    'backend',
    'leads',
    'eav',
]

INSTALLED_APPS = list(SHARED_APPS) + [app for app in TENANT_APPS if app not in SHARED_APPS]

TENANT_MODEL = "customers.PlannerClient"  # app.Model

TENANT_DOMAIN_MODEL = "customers.Domain"  # app.Model

PUBLIC_SCHEMA_NAME = 'public'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication',)
}

MIDDLEWARE = [
    'django_tenants.middleware.main.TenantMainMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'planner.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'planner.wsgi.application'

if not on_heroku:
    DATABASES = {
        'default': env.db(engine='django_tenants.postgresql_backend'),
    }

DATABASE_ROUTERS = (
    'django_tenants.routers.TenantSyncRouter',
)

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static')

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'frontend/',  # must end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': [r'.+\.hot-update.js', r'.+\.map']
    }
}

if on_heroku:
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'handlers': {
            'console': {
                'class': 'logging.StreamHandler',
            },
        },
        'loggers': {
            'django': {
                'handlers': ['console'],
                'level': os.getenv('DJANGO_LOG_LEVEL', 'ERROR'),
            },
        },
    }

    DEBUG = False
    SECURE_SSL_REDIRECT = True
    # Activate Django-Heroku without database setup.
    config = locals()
    django_heroku.settings(config, databases=False)
    # Manual configuration of database
    conn_max_age = config.get('CONN_MAX_AGE', 600)  # Used in django-heroku
    config['DATABASES'] = {
        'default': dj_database_url.parse(os.environ['DATABASE_URL'], engine='django_tenants.postgresql_backend',
                                         conn_max_age=conn_max_age, ssl_require=True
                                         )
    }
