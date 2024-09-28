from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore, auth
import os

app = Flask(__name__)
key = 'matchbox-2c411-firebase-adminsdk-3xwun-dcec4b26e6.json'
cred = credentials.Certificate(os.path.join(os.getcwd(), 'firebase_key', key))
firebase_admin.initialize_app(cred)

db = firestore.client()


if __name__ == "__main__":
    app.run(debug=True)