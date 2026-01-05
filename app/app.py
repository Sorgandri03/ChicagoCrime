import pandas
from sklearn.manifold import MDS
from sklearn.preprocessing import StandardScaler
from flask import request
from flask import Flask
from flask_cors import CORS
import os

# Backend
# Can be found at http://localhost:5000

app = Flask(__name__)
CORS(app)

def calculate_mds():
    ...
    
@app.route('/mds', methods=['POST'])
def get_mds():
    # Get parameters from request
    calculate_mds()
    print("MDS calculation endpoint hit")
    return 'OK', 200

if __name__ == '__main__':
    app.run(debug=True)