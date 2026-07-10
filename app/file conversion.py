import pandas
import os
import tqdm
from shapely.geometry import shape, Point
import json


result = {}

# Load GeoJSON as a dict to access features and geometry
with open(os.path.join('app/media', 'chicago-community-areas.geojson'), 'r') as f:
    geojson = json.load(f)

# Read crime data
dump = pandas.read_csv(os.path.join('app/data', '5anni.csv'))

# Prepare list of (community, polygon) for fast lookup
areas = []
for feature in geojson['features']:
    community = feature['properties'].get('community', feature['properties'].get('community_area', 'Unknown'))
    geom = feature['geometry']
    polygon = shape(geom)
    areas.append((community, polygon))

# Count crimes per community area
for item in tqdm.tqdm(dump.itertuples(), total=len(dump)):
    if pandas.notna(item.location) and str(item.location).strip() != "":
        loc = str(item.location)[1:-1]
        lat, lon = loc.split(", ")
        point = Point(float(lon), float(lat))
        for community, polygon in areas:
            if polygon.contains(point):
                result[polygon] = result.get(community, 0) + 1
                break

# Save result as CSV
pandas.Series(result).to_csv(os.path.join('app/data', '5anni_community_area.csv'))