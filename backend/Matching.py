from flask import Flask, request, jsonify
from google.cloud import firestore

app = Flask(__name__)

# Initialize Firestore client
db = firestore.Client()

# Firestore collections
USERS_COLLECTION = "users"
HALFMATCH_COLLECTION = "half_matches"
FULLMATCH_COLLECTION = "full_matches"

# Routes

@app.route('/user', methods=['POST'])
def create_user():
    data = request.json
    username = data.get('username')
    profile = data.get('profile')
    filters = data.get('filters')
    
    # Check if user exists
    user_ref = db.collection(USERS_COLLECTION).document(username)
    if user_ref.get().exists:
        return jsonify({"error": "User already exists"}), 400
    
    # Add new user to Firestore
    user_ref.set({
        "username": username,
        "profile": profile,
        "filters": filters
    })
    return jsonify({"message": "User created successfully"}), 201

@app.route('/user/<username>', methods=['GET'])
def get_user(username):
    user_ref = db.collection(USERS_COLLECTION).document(username)
    user = user_ref.get()
    
    if not user.exists:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(user.to_dict()), 200

@app.route('/match-find/<username>', methods=['GET'])
def find_matches(username):
    user_ref = db.collection(USERS_COLLECTION).document(username)
    user = user_ref.get()
    
    if not user.exists:
        return jsonify({"error": "User not found"}), 404
    
    user_data = user.to_dict()
    user_filters = user_data.get('filters')
    
    # Find potential matches based on filters
    potential_matches = []
    users = db.collection(USERS_COLLECTION).stream()
    
    for u in users:
        u_data = u.to_dict()
        if u_data['username'] != username and u_data['filters'] == user_filters:
            potential_matches.append(u_data['username'])
    
    return jsonify({
        "potential_matches": potential_matches
    }), 200

@app.route('/swipe-right', methods=['POST'])
def swipe_right():
    data = request.json
    user1 = data.get('user1')
    user2 = data.get('user2')
    
    # Check if user2 has already swiped right on user1
    half_match_query = db.collection(HALFMATCH_COLLECTION).where('user1', '==', user2).where('user2', '==', user1).stream()
    
    if any(half_match_query):
        # It's a full match!
        db.collection(FULLMATCH_COLLECTION).add({
            'user1': user1,
            'user2': user2
        })
        
        # Remove the half match entry
        for match in half_match_query:
            db.collection(HALFMATCH_COLLECTION).document(match.id).delete()
        
        return jsonify({"message": "Full Match!"}), 201
    
    # Otherwise, add to HalfMatch collection
    db.collection(HALFMATCH_COLLECTION).add({
        'user1': user1,
        'user2': user2
    })
    return jsonify({"message": "Half Match!"}), 201

@app.route('/swipe-left', methods=['POST'])
def swipe_left():
    data = request.json
    user1 = data.get('user1')
    user2 = data.get('user2')
    
    # Check and remove any half matches involving these users
    half_match_query = db.collection(HALFMATCH_COLLECTION).where('user1', '==', user1).where('user2', '==', user2).stream()
    
    if any(half_match_query):
        for match in half_match_query:
            db.collection(HALFMATCH_COLLECTION).document(match.id).delete()
        return jsonify({"message": f"{user2} rejected by {user1}"}), 200
    
    return jsonify({"message": "No match found to reject"}), 404

@app.route('/matches/<username>', methods=['GET'])
def get_matches(username):
    # Get full matches for the user
    full_matches_query = db.collection(FULLMATCH_COLLECTION).where('user1', '==', username).stream()
    full_matches_query2 = db.collection(FULLMATCH_COLLECTION).where('user2', '==', username).stream()
    
    match_list = [{"user1": match.to_dict()['user1'], "user2": match.to_dict()['user2']} for match in full_matches_query]
    match_list.extend([{"user1": match.to_dict()['user1'], "user2": match.to_dict()['user2']} for match in full_matches_query2])
    
    return jsonify({
        "full_matches": match_list
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
