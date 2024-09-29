from flask import Blueprint, request, g, jsonify
import random

match_blueprint = Blueprint('match', __name__)

# get potential_matches: 
#   request -> {email: user_email}
#   response -> {emails: [emails]}
@match_blueprint.route('/match/get_potential_matches', methods=['GET'])
def get_potential_matches():
    ## THIS NEEDS TO BE FIXED SINCE IT DOESN'T KEEP THE DOCUMENTS WHERE
    ## THE USERS DO NOT HAVE THE ATTRIBUTES LIKE YEAR (but it should)
    db = g.db
    data = request.args
    user_id = data.get('user_id')

    try:
        # Get the user's document reference
        user_ref = db.collection('users').document(user_id)
                
        # Retrieve the document and convert it to a dictionary
        user_doc = user_ref.get()
        if not user_doc.exists:
            return jsonify({"error": "User not found"}), 404

        user_data = user_doc.to_dict()

        # Extract filters, providing defaults if they are not in the document
        filters = user_data.get("filters", {})
        min_year = int(filters.get('min_year', 0))
        max_year = int(filters.get('max_year', 100))
        skills = filters.get('skills_to_learn', [])
        matched_from = user_data.get("matched_from", [])
        matched_to = user_data.get("matched_to", [])
        rejected = user_data.get("rejected", [])
        matched_full = user_data.get("matched_full", [])
        # Query other users based on the filters
        # Collect document IDs that match the criteria
        random_seed = random.random()

        users = db.collection('users').limit(100).stream()
        users = list(users)

        # Shuffle the list to randomize the order
        random.shuffle(users)

        ids = [m for m in matched_from]
        for doc in users:
            docs = doc.to_dict()
            docs["rejected"] = docs.get("rejected", [])
            docs["skills_to_learn"] = docs.get("skills_to_learn", [])
            docs["skills_to_offer"] = docs.get("skills_to_offer", [])
            if not filters:
                if user_id not in docs["rejected"] and doc.id not in matched_to and doc.id not in rejected and doc.id not in matched_full:
                    if user_id != doc.id:
                        ids.append(doc.id)
            else:
                if min_year <= int(docs.get('year', 0)) or max_year >= int(docs.get('year', 0)):
                    for skill in skills:
                        if user_id not in docs["rejected"] and doc.id not in matched_to and doc.id not in rejected and doc.id not in matched_full:
                            if skill in docs["skills_to_learn"] or skill in docs["skills_to_offer"]:
                                if user_id != doc.id:
                                    ids.append(doc.id)
                                break

        return jsonify({'message': 'success', 'user_ids': ids}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# put swipe:
#   request -> {user_email, swiped_email,  type}
@match_blueprint.route('/put_swipe', methods=['PUT'])
def put_swipe():
    db = g.db
    data = request.json
    user_id = data.get('user_id')
    swiped_id = data.get('swiped_id')
    type = data.get('type')
    if (type == 'left'):
        return swipe_left(db, user_id, swiped_id)
    else:
        return swipe_right(db, user_id, swiped_id)
    
    #return jsonify({'Email1:': user_email, 'Email2:': swiped_email})

def swipe_left(db, user_id, swiped_id):
    user_ref = db.collection('users').document(user_id)
    user_rejects = user_ref.get().to_dict()
    if "rejected" not in user_rejects:
        user_rejects["rejected"] = []
    if swiped_id not in user_rejects["rejected"]:
        user_rejects["rejected"].append(swiped_id)
    user_ref.update({"rejected": user_rejects["rejected"]})
    return jsonify({'message': 'successfully placed on reject list'})

def swipe_right(db, user_id, swiped_id):
    user_ref = db.collection('users').document(user_id)
    swiped_ref = db.collection('users').document(swiped_id)
    user_dict = user_ref.get().to_dict()
    swiped_dict = swiped_ref.get().to_dict()
    user_dict["matched_from"] = user_dict.get("matched_from", [])
    if swiped_id in user_dict["matched_from"]:
        user_dict["matched_from"].remove(swiped_id)
        swiped_dict["matched_to"].remove(user_id)
        user_dict["matched_full"] = user_dict.get("matched_full", [])
        swiped_dict["matched_full"] = swiped_dict.get("matched_full", [])
        user_dict["matched_full"].append(swiped_id)
        swiped_dict["matched_full"].append(user_id)
        full_match = True
    else:
        user_dict["matched_to"] = user_dict.get("matched_to", [])
        swiped_dict["matched_from"] = swiped_dict.get("matched_from", [])
        user_dict["matched_to"].append(swiped_id)
        swiped_dict["matched_from"].append(user_id)
        full_match = False
    user_ref.update(user_dict)
    swiped_ref.update(swiped_dict)
    return jsonify({'message': 'successfully placed on match list', "full_match": full_match})

