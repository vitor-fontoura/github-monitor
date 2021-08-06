import requests
from django_filters import rest_framework as filters
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.forms.models import model_to_dict

from rest_framework import mixins
from rest_framework import generics

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer

class RepositoryList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    page_size = 10
    def perform_create(self, serializer):
        repository = serializer.save()

        user = self.request.user
        name = serializer.validated_data['name']

        url = f'http://api.github.com/repos/{user}/{name}/commits'
        githubCommits = requests.get(url).json()

        for githubCommit in githubCommits:
            if not githubCommit['author']:
                githubCommit['author'] = {
                    'avatar_url': 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                }

            commit = Commit(
                sha=githubCommit['sha'],
                author=githubCommit['commit']['author']['name'],
                date=githubCommit['commit']['author']['date'],
                message=githubCommit['commit']['message'],
                url=githubCommit['html_url'],
                avatar=githubCommit['author']['avatar_url'],
                repository=repository
            )
            commit.save()



class CommitList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Commit.objects.all()
    serializer_class = CommitSerializer
    filterset_fields = ['author', 'repository__name']
    page_size = 10
"""
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def commit_list_view(request):
    commits = Commit.objects.all()
    serializer = CommitSerializer(commits, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def repository_create_view(request):
    serializer = RepositorySerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = request.user
    repo = serializer.validated_data['name']

    if not exists_repo(user, repo):
        return Response({}, status=status.HTTP_404_NOT_FOUND)
    
    serializer.save()

    # TODO adicionar tarefa celery ao invés de realizar aqui
    itens = get_commits(user, repo)

    commit = CommitSerializer(data=itens, many=True)
    commit.is_valid(raise_exception=True)

    return Response(serializer.data, status=status.HTTP_201_CREATED)

# TODO Mover para celery?
def get_commits(user, repo):
    url = f'http://api.github.com/repos/{user}/{repo}/commits'
    request = requests.get(url)
    return request.json()
"""