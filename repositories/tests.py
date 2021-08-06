from rest_framework.test import APITestCase
from rest_framework import status
from django.test import TestCase
from .models import Commit, Repository

class AuthTestCase(APITestCase):

    def test_permission_denied_without_credentials(self):
        assert False


class RepositoryTestCase(APITestCase):

    def setUp(self):
        Repository.objects.create(name="repository_1")
        Repository.objects.create(name="repository_1")
    
    def test_unique_repository_name(self):
        assert False

    def test_invalid_repository(self):
        assert False

    def test_creating_repository(self):
        assert False

    def test_listing_repositories(self):
        assert False

class CommitTestCase(APITestCase):
    
    def setUp(self):
        Repository.objects.create(name="repository_1")
        Repository.objects.create(name="repository_2")

    def test_listing_commits(self):
        assert False

    def test_filtering_commits_by_author(self):
        assert False

    def test_filtering_commits_by_repository_name(self):
        assert False

    def test_commits_pagination(self):
        assert False