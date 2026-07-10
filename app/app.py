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

def load_data():
    data = pandas.read_csv(os.path.join('data', '5anni.csv'))
    return data
    
@app.route('/mds', methods=['POST'])
def get_mds():
    # Get parameters from request
    calculate_mds()
    print("MDS calculation endpoint hit")
    return 'OK', 200

@app.route('/data', methods=['GET'])
def get_data():
    global data
    graph = request.args.get('graph')

    match graph:
        case 'scatteredplot':
            return 0
        case 'bargraph':
            counts = data['primary_type'].value_counts().reset_index()
            counts.columns = ['crime', 'count']
            json_str = counts.to_json(orient='records')
            return json_str, 200, {'Content-Type': 'application/json'}
        case 'map':
            counts = pandas.read_csv(os.path.join('data', '5anni_community_area.csv'))
            json_str = counts.to_json(orient='records')
            return json_str, 200, {'Content-Type': 'application/json'}
        case 'stackedarea':
            counts = data[['year', 'primary_type']].value_counts().reset_index()
            counts.columns = ['year', 'primary_type', 'count']
            counts['year'] = pandas.to_numeric(counts['year'], errors='coerce')
            counts = counts.dropna(subset=['year'])
            counts['year'] = counts['year'].astype(int)
            counts = counts.sort_values(['year', 'count']).reset_index(drop=True)
            json_str = counts.to_json(orient='records')
            return json_str, 200, {'Content-Type': 'application/json'}
        case _:
            return 'Invalid graph type', 400
    
    return data.to_json()

if __name__ == '__main__':
    global data
    data = load_data()
    app.run(debug=True)