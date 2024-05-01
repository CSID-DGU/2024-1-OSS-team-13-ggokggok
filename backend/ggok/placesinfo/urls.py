from django.urls import path
from placesinfo.serializers import PlaceInfoListAPIView, PlaceInfoAPIView

urlpatterns = [
    path('', PlaceInfoListAPIView.as_view(), name='place-list'),
    path('<int:id>/', PlaceInfoAPIView.as_view(), name='place-detail'),
]