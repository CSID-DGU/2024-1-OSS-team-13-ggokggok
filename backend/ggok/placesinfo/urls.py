from django.urls import path
from placesinfo.views import RegionSearch

urlpatterns = [
    path('', RegionSearch, name='place_info_list'),

]