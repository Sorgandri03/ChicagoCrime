import pandas
from sklearn.manifold import MDS
from sklearn.preprocessing import StandardScaler
from flask import request
from flask import Flask
from flask_cors import CORS
import os

from sklearn.cluster import KMeans
import json

# Backend
# Can be found at http://localhost:5000

app = Flask(__name__)
CORS(app)

mds_cache = {}

def calculate_mds(metric='profile'):
    global mds_cache
    if metric in mds_cache:
        return mds_cache[metric]

    base_dir = os.path.dirname(__file__)
    csv_path = os.path.join(base_dir, 'data', 'community_crimes.csv')
    if not os.path.exists(csv_path):
        csv_path = os.path.join('data', 'community_crimes.csv')

    df = pandas.read_csv(csv_path, index_col='community_name')

    if metric == 'volume':
        scaler = StandardScaler()
        feat_matrix = scaler.fit_transform(df)
    else:  # 'profile' (relative proportions)
        feat_matrix = df.div(df.sum(axis=1), axis=0).values

    mds = MDS(n_components=2, random_state=42, n_init=4)
    coords = mds.fit_transform(feat_matrix)

    proportions = df.div(df.sum(axis=1), axis=0)
    kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
    cluster_ids = kmeans.fit_predict(proportions)

    cluster_names = {}
    city_mean = proportions.mean()
    for k in range(4):
        mask = (cluster_ids == k)
        cluster_mean = proportions[mask].mean()
        diff = cluster_mean - city_mean
        top_distinctive = diff.sort_values(ascending=False).index[0]
        if top_distinctive == 'THEFT':
            name = 'Property & Theft Focus'
        elif top_distinctive in ['BATTERY', 'WEAPONS VIOLATION', 'ASSAULT', 'HOMICIDE']:
            name = 'Violent & Weapons Focus'
        elif top_distinctive == 'DECEPTIVE PRACTICE':
            name = 'Fraud & Deceptive Practice'
        else:
            name = f'{top_distinctive.title()} & General'
        cluster_names[k] = name

    results = []
    for i, community in enumerate(df.index):
        row = df.loc[community]
        total = int(row.sum())
        top_3 = row.sort_values(ascending=False).head(3)
        top_list = [{'crime': c, 'count': int(v), 'pct': round((v / total) * 100, 1)} for c, v in top_3.items()]
        results.append({
            'community': community,
            'x': round(float(coords[i, 0]), 4),
            'y': round(float(coords[i, 1]), 4),
            'cluster': int(cluster_ids[i]),
            'cluster_label': cluster_names[cluster_ids[i]],
            'total_crimes': total,
            'top_crimes': top_list
        })

    json_data = json.dumps(results)
    mds_cache[metric] = json_data
    return json_data

def load_data():
    data = pandas.read_csv(os.path.join('data', '5anni.csv'))
    return data
    
@app.route('/mds', methods=['GET', 'POST'])
def get_mds():
    metric = request.args.get('metric', 'profile')
    if request.is_json and request.json and 'metric' in request.json:
        metric = request.json['metric']
    res = calculate_mds(metric)
    return res, 200, {'Content-Type': 'application/json'}

@app.route('/data', methods=['GET'])
def get_data():
    global data
    graph = request.args.get('graph')

    match graph:
        case 'scatteredplot':
            metric = request.args.get('metric', 'profile')
            res = calculate_mds(metric)
            return res, 200, {'Content-Type': 'application/json'}
        case 'bargraph':
            counts = data['primary_type'].value_counts().reset_index()
            counts.columns = ['crime', 'count']
            json_str = counts.to_json(orient='records')
            return json_str, 200, {'Content-Type': 'application/json'}
        case 'map':
            counts = pandas.read_csv(os.path.join('data', 'crime_by_community_area.csv'))
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