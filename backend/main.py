from flask import Flask, jsonify
from flask_cors import CORS
from firebase_config import db

app = Flask(__name__)

app.config.from_object(__name__)

CORS(app,resources={r"/*":{'origins':'*'}})

@app.route('/shark', methods=['GET'])
def shark():
    return("HIJUEPUTA VIDA")

if __name__ == "__main__":
    app.run(debug=True)

def read_test_document():
    doc_ref = db.collection('test').document('prueba1')
    doc = doc_ref.get()
    if doc.exists:
        print(f'Document data: {doc.to_dict()}')
    else:
        print('No such document!')

read_test_document()