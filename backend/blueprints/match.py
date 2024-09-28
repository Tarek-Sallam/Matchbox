from flask import Blueprint

match_blueprint = Blueprint('match', __name__)

# get potential_matches: 
#   request -> {email: user_email}
#   response -> {emails: [emails]}

# put swipe:
#   request -> {user_email, swiped_email,  type}


