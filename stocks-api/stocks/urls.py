from django.urls import path
from stocks import views
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path('<str:ticker>/', views.company_info),
    path('<str:ticker>/<str:start_date>/<str:to_date>/', views.stock_data)
]
