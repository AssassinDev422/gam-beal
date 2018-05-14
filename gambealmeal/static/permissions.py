from rest_framework import permissions
import logging
logger = logging.getLogger(__name__)

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allows permissions only if admin or reading if authenticated. 
    """
    def has_permission(self, request, view):
        if request.user.is_staff:
            return True

        if request.method in permissions.SAFE_METHODS and request.user.is_authenticated():
            return True

        return False

class IsAdminOrReadOnlyNoAuth(permissions.BasePermission):
    """
    Allows admins to edit and unauthenticated to view.
    """
    def has_permission(self, request, view):
        if request.user.is_staff:
            return True

        if request.method in permissions.SAFE_METHODS:
            return True

        return False

class IsAdminOrOwner(permissions.BasePermission):
    """
    Allows editing by owner or admin. 
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated() and (request.method=='POST' or request.method=='GET'):
            return True
        if request.user.is_staff:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        return request.user == obj.user