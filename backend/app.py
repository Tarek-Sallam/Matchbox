from flask import Flask
import os

from firebase_setup import firebase_setup
from blueprints.match import match_blueprint
from blueprints.user import user_blueprint

# blueprint stuff
app = Flask(__name__)
app.register_blueprint(match_blueprint, url_prefix='match')
app.register_blueprint(user_blueprint, url_prefix='user')


# firebase stuff
key = 'matchbox-2c411-firebase-adminsdk-3xwun-dcec4b26e6.json'
db = firebase_setup(os.path.join(os.getcwd(), 'firebase_key', key))

