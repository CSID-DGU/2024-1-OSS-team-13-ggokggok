from django.apps import AppConfig

class PlaceConfig(AppConfig):
    name = 'place'

    def ready(self):
        import place.signals