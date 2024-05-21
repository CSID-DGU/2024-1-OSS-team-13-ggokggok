from pathlib import Path
from environ import ImproperlyConfigured

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
import os
from dotenv import load_dotenv
load_dotenv()
def get_env_variable(var_name):
  try:
    return os.environ[var_name]
  except KeyError:
    error_msg = 'Set the {} environment variable'.format(var_name)
    raise ImproperlyConfigured(error_msg)

SECRET_KEY = get_env_variable('SECRET_KEY')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!



# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'community.apps.GgokConfig',
    'rest_framework',
    'psycopg2',
    'rest_framework_swagger',
    'drf_yasg',
    'place.apps.PlaceConfig',
    'corsheaders',
    'user',
    'placesinfo'
    ]

MIDDLEWARE =[
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': get_env_variable('DB_NAME'),
        'USER': get_env_variable('DB_USER'),
        'PASSWORD': get_env_variable('DB_PASSWORD'),
        'HOST': get_env_variable('DB_HOST'),
        'PORT': get_env_variable('DB_PORT'),
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'


USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'user.UserInfo'

# settings.py
SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'basic': {
            'type': 'basic'
        }
    },
    'DEFAULT_PROTOCOL': 'https',
    'DEFAULT_API_URL': 'https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app',

}
DEBUG = True

# ALLOWED_HOSTS = ['port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app','127.0.0.1', 'localhost']
ALLOWED_HOSTS = ['*']
CORS_ALLOW_ALL_ORIGINS = True

#CORS_ALLOWED_ORIGINS = ['http://localhost:5173', 'https://oss-ggok.web.app',
#  'https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app']

CSRF_TRUSTED_ORIGINS =['https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app', 'https://oss-ggok.web.app','http://localhost:5173']
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

CSRF_COOKIE_SAMESITE = 'None'
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_NAME = "csrftoken"
CSRF_COOKIE_HTTPONLY = False  # Allow JavaScript to access the CSRF cookie
CORS_ALLOW_HEADERS = [
    "Content-Type",
    "Authorization",
]
# REST_FRAMEWORK = {
#      'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework.authentication.SessionAuthentication',],}
#     'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.IsAuthenticated',],}
