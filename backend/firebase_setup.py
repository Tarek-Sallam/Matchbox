import firebase_admin
from firebase_admin import credentials, firestore, auth

def firebase_setup(path_to_key):
    cred = credentials.Certificate(path_to_key)
    firebase_admin.initialize_app(cred)
    return firestore.client()