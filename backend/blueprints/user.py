from flask import Blueprint

user_blueprint = Blueprint('user', __name__)

# get user info (via email): 
#   request -> {email: user_email}
#   response -> {name: user_name, info}

# put user info (via email):
#   request -> {email: user_email}
#   response -> {status}

# put user filter :
#   request -> {email: user_email, updated_filter}
#   response -> {status}