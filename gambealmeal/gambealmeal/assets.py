import os
import json

def get_assets():
    with open(os.path.join(os.path.dirname(__file__), '../../frontend/webpack-assets.json')) as data_file:
        assets = json.load(data_file)
    return assets
