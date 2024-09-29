from flask import Blueprint, request, g, jsonify
from firebase_admin import auth, firestore, storage

user_blueprint = Blueprint('user', __name__)

## ALLOWS A USER TO SIGNUP AND PUTS THEIR DATA IN THE DATABASE
## Request: Content-Type: application/json
## email: (user's email)
## password: (user's password)
## fname: (user's first name)
## lname: (user's last name)
@user_blueprint.route('/login', methods=['GET'])
def login():
    db = g.db
    data = request.args
    email = data.get('email')
    password = data.get('password')
    user_query = db.collection('users').where('email', '==', email).where('password', '==', password).stream()
    users = list(user_query)  # Convert the stream to a list
    if users:  # Check if the user exists
        # You should verify the password on the client side instead
        return jsonify({'message': 'User found', 'uid': users[0].id}), 200
    else:
        return jsonify({'error': 'User not found'}), 404

@user_blueprint.route('/signup', methods=['POST'])
def signup():
    db = g.db
    data = request.json
    email = data.get('email')
    password = data.get('password')
    fname = data.get('fname')
    lname = data.get('lname')

    if not email or not password:
        return jsonify({'ERROR:': 'Email and password required.'}), 400
    
    try:
        user = auth.create_user(
            email = email,
            password=password,
        )
        user_ref = db.collection('users').document(user.uid)
        user_ref.set({
            'email': email,
            'fname': fname,
            'lname': lname,
            'password': password,
            'created_at': firestore.SERVER_TIMESTAMP
        })

        return jsonify({'message': 'User create successfully', 'uid': user.uid})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@user_blueprint.route('/update_profile', methods=['PUT'])
def update_profile():
    db = g.db
    data = request.json
    user_id = request.args.get('user_id')
    try:
        user_ref = db.collection('users').document(user_id)
        data = request.json
        bio = data.get('bio')
        photo = request.files['photo']
        if photo:
            bucket = storage.bucket()
            blob = bucket.blob(f'{user_id}/{photo.filename}')
            blob.upload_from_file(photo)
            blob.make_public()
            photo_url = blob.public_url
            user_ref.update({'photo_url': photo_url})
        skills = data.get('skills_to_offer')
        skills_to_learn = data.get('skills_to_learn')
        fname = data.get('fname')
        lname = data.get('lname')
        school = data.get('school')
        major = data.get('major')
        year = data.get('year')
        user_ref.update({'fname': fname, 'lname': lname, 'skills_to_offer': skills, 'skills_to_learn': skills_to_learn, 'bio': bio, 'school': school, 'major': major, 'year': year})
        return jsonify({'message': 'Profile update success'})
    
    except Exception as e:
        return jsonify({'ERROR': str(e)}), 400

@user_blueprint.route('/update_filters', methods=['PUT'])
def update_filters():
    db = g.db
    data = request.json
    user_id = request.args.get('user_id')
    try:
        user_ref = db.collection('users').document(user_id)
        data = request.json
        filters = data.get('filters')
        user_ref.update({'filters': filters})
        return jsonify({'message': 'Profile update success'})
    
    except Exception as e:
        return jsonify({'ERROR': str(e)}), 400
    
@user_blueprint.route('/get_profile', methods=['GET'])
def get_profile():
    db = g.db
    uid = request.args['uid']
    doc = db.collection('users').document(uid).get().to_dict()
    if doc:
        ### remove anything from the doc we don't care about
        return jsonify(doc)
    else:
        return jsonify({'ERROR': 'Could not find profile'})
    