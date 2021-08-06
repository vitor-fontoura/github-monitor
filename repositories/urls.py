from django.urls import path

#from .views import commit_list_view, repository_create_view
from .views import CommitList, RepositoryList

app_name = 'repositories'

#urlpatterns = [
#    path('api/commits/', commit_list_view, name='commits-list'),
#    path('api/repositories/', repository_create_view, name='repositories-create'),
#]

urlpatterns = [
    path('api/repositories/', RepositoryList.as_view()),
    path('api/commits/', CommitList.as_view()),
]

#urlpatterns = format_suffix_patterns(urlpatterns)