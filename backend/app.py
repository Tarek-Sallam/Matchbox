from flask import Flask, g
import os
import firebase_admin
from firebase_admin import credentials, firestore, auth
from key import get_key

from blueprints.match import match_blueprint
from blueprints.user import user_blueprint

key = get_key()

# get the credential for firebase
cred = credentials.Certificate(os.path.join(os.getcwd(), 'firebase_key', key))

# initalize the firebase SDK
firebase_admin.initialize_app(cred)

# initialize the flask app
app = Flask(__name__)

## get the db into a global variable before each request
def get_db():
    if 'db' not in g:
        g.db = firestore.client()
    return g.db

@app.before_request
def before_request():
    get_db()
    

## register the blueprints into the app
app.register_blueprint(match_blueprint, url_prefix='/match')
app.register_blueprint(user_blueprint, url_prefix='/user')

## run the app
if __name__ == '__main__':
    app.run(debug=False)



