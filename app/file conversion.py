import pandas
import os
import tqdm
from shapely.geometry import shape, Point
import json


resault = {}

# Load GeoJSON as a dict to access features and geometry
with open(os.path.join('media', 'chicago-community-areas.geojson'), 'r') as f:
    geojson = json.load(f)

# Read crime data
dump = pandas.read_csv(os.path.join('data', 'chicago_crime_data.csv'))

# Prepare list of (community, polygon) for fast lookup
areas = []
for feature in geojson['features']:
    community = feature['properties'].get('community', feature['properties'].get('community_area', 'Unknown'))
    geom = feature['geometry']
    polygon = shape(geom)
    areas.append((community, polygon))

# Count crimes per community area
for item in tqdm.tqdm(dump.itertuples(), total=len(dump)):
    lat = item.latitude
    lon = item.longitude
    point = Point(lon, lat)
    for community, polygon in areas:
        if polygon.contains(point):
            resault[polygon] = resault.get(community, 0) + 1
            break

# Save result as CSV
pandas.Series(resault).to_csv(os.path.join('data', 'crime_by_community_area.csv'))