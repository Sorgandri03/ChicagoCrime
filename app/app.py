import os
import json
import pandas
from flask import Flask, request
from flask_cors import CORS
from sklearn.manifold import MDS
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# Backend
# Can be found at http://localhost:5000

app = Flask(__name__)
CORS(app)

mds_cache = {}
agg_data = None

def load_aggregated_data():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(base_dir, 'data', 'crimes_2020_2025_by_community.csv')
    if not os.path.exists(csv_path):
        csv_path = os.path.join('data', 'crimes_2020_2025_by_community.csv')
    df = pandas.read_csv(csv_path)
    return df

def calculate_mds(start_year=None, end_year=None, **kwargs):
    global mds_cache, agg_data
    cache_key = f"{start_year}_{end_year}"
    if cache_key in mds_cache:
        return mds_cache[cache_key]

    sub = agg_data
    if start_year is not None:
        sub = sub[sub['year'] >= start_year]
    if end_year is not None:
        sub = sub[sub['year'] <= end_year]

    pivot = sub.pivot_table(index='community_name', columns='primary_type', values='count', aggfunc='sum', fill_value=0)
    all_communities = sorted(agg_data['community_name'].unique())
    pivot = pivot.reindex(all_communities, fill_value=0)

    row_sums = pivot.sum(axis=1)
    row_sums_safe = row_sums.copy()
    row_sums_safe[row_sums_safe == 0] = 1

    feat_matrix = pivot.div(row_sums_safe, axis=0).values

    mds = MDS(n_components=2, random_state=42, n_init=4)
    coords = mds.fit_transform(feat_matrix)

    proportions = pivot.div(row_sums_safe, axis=0)
    kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
    cluster_ids = kmeans.fit_predict(proportions)

    cluster_names = {}
    city_mean = proportions.mean()
    for k in range(4):
        mask = (cluster_ids == k)
        cluster_mean = proportions[mask].mean()
        diff = cluster_mean - city_mean
        sorted_diff = diff.sort_values(ascending=False)
        top_distinctive = sorted_diff.index[0] if len(sorted_diff) > 0 else 'CRIME'
        if top_distinctive == 'THEFT':
            name = 'Property & Theft'
        elif top_distinctive in ['BATTERY', 'WEAPONS VIOLATION', 'ASSAULT', 'HOMICIDE']:
            name = 'Violent & Weapons'
        elif top_distinctive == 'DECEPTIVE PRACTICE':
            name = 'Fraud & Deceptive Practice'
        elif top_distinctive == 'MOTOR VEHICLE THEFT':
            name = 'General Crimes'
        else:
            name = 'General Crimes'
        cluster_names[k] = name

    results = []
    for i, community in enumerate(pivot.index):
        row = pivot.loc[community]
        total = int(row.sum())
        top_3 = row.sort_values(ascending=False).head(3)
        top_list = [{'crime': c, 'count': int(v), 'pct': round((v / max(1, total)) * 100, 1)} for c, v in top_3.items()]
        results.append({
            'community': community,
            'x': round(float(coords[i, 0]), 4),
            'y': round(float(coords[i, 1]), 4),
            'cluster': int(cluster_ids[i]),
            'cluster_label': cluster_names.get(cluster_ids[i], 'General Crime Profile'),
            'total_crimes': total,
            'top_crimes': top_list
        })

    json_data = json.dumps(results)
    mds_cache[cache_key] = json_data
    return json_data

@app.route('/mds', methods=['GET', 'POST'])
def get_mds():
    start_year = request.args.get('start_year', type=int)
    end_year = request.args.get('end_year', type=int)
    if request.is_json and request.json:
        if 'start_year' in request.json:
            start_year = int(request.json['start_year'])
        if 'end_year' in request.json:
            end_year = int(request.json['end_year'])
    res = calculate_mds(start_year, end_year)
    return res, 200, {'Content-Type': 'application/json'}

@app.route('/data', methods=['GET'])
def get_data():
    global agg_data
    graph = request.args.get('graph')
    community = request.args.get('community')
    crime = request.args.get('crime')
    start_year = request.args.get('start_year', type=int)
    end_year = request.args.get('end_year', type=int)

    match graph:
        case 'scatteredplot':
            res = calculate_mds(start_year, end_year)
            return res, 200, {'Content-Type': 'application/json'}

        case 'bargraph':
            sub = agg_data
            communities = request.args.get('community') or request.args.get('communities')
            if communities:
                comm_list = [c.strip().upper() for c in communities.split(',') if c.strip()]
                if comm_list:
                    sub = sub[sub['community_name'].str.upper().isin(comm_list)]
            if start_year is not None:
                sub = sub[sub['year'] >= start_year]
            if end_year is not None:
                sub = sub[sub['year'] <= end_year]

            counts = sub.groupby('primary_type')['count'].sum().reset_index()
            counts.columns = ['crime', 'count']
            counts = counts.sort_values(by='count', ascending=False)
            json_str = counts.to_json(orient='records')
            return json_str, 200, {'Content-Type': 'application/json'}

        case 'map':
            sub = agg_data
            if crime:
                sub = sub[sub['primary_type'].str.upper() == crime.upper()]
            if start_year is not None:
                sub = sub[sub['year'] >= start_year]
            if end_year is not None:
                sub = sub[sub['year'] <= end_year]

            counts = sub.groupby('community_name')['count'].sum().reset_index()
            counts.columns = ['community_area', 'crime_count']
            json_str = counts.to_json(orient='records')
            return json_str, 200, {'Content-Type': 'application/json'}

        case 'stackedarea':
            sub = agg_data
            communities = request.args.get('community') or request.args.get('communities')
            if communities:
                comm_list = [c.strip().upper() for c in communities.split(',') if c.strip()]
                if comm_list:
                    sub = sub[sub['community_name'].str.upper().isin(comm_list)]

            counts = sub.groupby(['year', 'primary_type'])['count'].sum().reset_index()
            counts = counts.sort_values(['year', 'count']).reset_index(drop=True)
            json_str = counts.to_json(orient='records')
            return json_str, 200, {'Content-Type': 'application/json'}

        case _:
            return 'Invalid graph type', 400

# Initialize global dataset
agg_data = load_aggregated_data()

if __name__ == '__main__':
    app.run(debug=True)
