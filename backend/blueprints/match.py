from flask import Blueprint, request, g, jsonify

match_blueprint = Blueprint('match', __name__)

# get potential_matches: 
#   request -> {email: user_email}
#   response -> {emails: [emails]}
@match_blueprint.route('/get_potential_matches', methods=['GET'])
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

        # Apply filters for 'year'
        min_year = filters.get('min_year', 0)
        max_year = filters.get('max_year', 100)

        # Query other users based on the filters
        id_list = db.collection('users').where('year', '>=', min_year).where('year', '<=', max_year).stream()

        # Collect document IDs that match the criteria
        document_ids = [doc.id for doc in id_list]

        return jsonify({'document_ids': document_ids}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    ##### implement more of the skill comparisons

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
    else:
        user_dict["matched_to"] = user_dict.get("matched_to", [])
        swiped_dict["matched_from"] = swiped_dict.get("matched_from", [])
        user_dict["matched_to"].append(swiped_id)
        swiped_dict["matched_from"].append(user_id)
    user_ref.update(user_dict)
    swiped_ref.update(swiped_dict)
    return jsonify({'message': 'successfully placed on match list'})

