import os

def get_key():
    for root, dirs, files in os.walk("./firebase_key", topdown=False):
        for name in files:
            return name