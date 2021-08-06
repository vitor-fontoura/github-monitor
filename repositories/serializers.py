from rest_framework import serializers

from .models import Commit, Repository

import requests

class RepositorySerializer(serializers.ModelSerializer):
    
    def validate_name(self, value):
        repo = f"{self.context['request'].user}/{value}"
        if not requests.get(f'http://api.github.com/repos/{repo}').status_code == 200:
            raise serializers.ValidationError(
                f"The repository {repo} doesn't exist.",
                code='repository_not_found'
            )
        if Repository.objects.filter(name=value).exists():
            raise serializers.ValidationError(f"Repository {repo} already exists.")

        return value

    class Meta:
        model = Repository
        fields = ('name',)


class CommitSerializer(serializers.ModelSerializer):
    repository = RepositorySerializer(many=False)

    class Meta:
        model = Commit
        fields = (
            'message',
            'sha',
            'author',
            'url',
            'avatar',
            'date',
            'repository',
        )

#class CommitFromGitHubSerializer(serializer):
