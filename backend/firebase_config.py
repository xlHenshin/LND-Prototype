import firebase_admin, json
from firebase_admin import credentials, firestore

cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def upload_radiosaman_data():
    with open('programas.json', 'r', encoding='utf-8') as file:
        radiosaman_data = json.load(file)

    for content in radiosaman_data:
        content_ref = db.collection('contenidos').document('rs').collection('programas_rs').document(content['id'])
        content_ref.set(content)

if __name__ == '__main__':
    upload_radiosaman_data()
