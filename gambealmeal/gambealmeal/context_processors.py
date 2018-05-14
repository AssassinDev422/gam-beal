"""
Add Webpack files to request context
"""
from __future__ import unicode_literals
from django.conf import settings as django_settings
from django.core.exceptions import ImproperlyConfigured

from django.conf import settings

import os
import json

from .assets import get_assets

def environment(request):
    assets = get_assets()
    bundle = assets['main']['js']

    if settings.WEBPACK_ROOT:
        bundle = settings.WEBPACK_ROOT + bundle

    return {
        'JS_BUNDLE_LOCATION': bundle
    }