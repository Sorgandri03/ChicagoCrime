import json
import os
import re
from numbers import Integral

import pandas
from shapely.geometry import Point, shape
from shapely.strtree import STRtree


counts = {}

# Load GeoJSON as a dict to access features and geometry
with open(os.path.join('media', 'chicago-community-areas.geojson'), 'r') as f:
    geojson = json.load(f)

# Read crime data
dump = pandas.read_csv(os.path.join('data', 'chicago_crime_data.csv'))

# Prepare polygons and a spatial index so each crime is only tested against
# nearby community areas.
areas = []
communities_by_polygon_id = {}
for feature in geojson['features']:
    community = feature['properties'].get(
        'community', feature['properties'].get('community_area', 'Unknown')
    )
    polygon = shape(feature['geometry'])
    areas.append(polygon)
    communities_by_polygon_id[id(polygon)] = str(community).upper()

area_index = STRtree(areas)


def location_to_point(value):
    """Convert the dataset's '(latitude, longitude)' value to a Point."""
    if not isinstance(value, str):
        return None
    match = re.fullmatch(
        r'\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)\s*',
        value,
    )
    if not match:
        return None
    latitude, longitude = map(float, match.groups())
    return Point(longitude, latitude)

# Count crimes per community area
for item in dump.itertuples(index=False):
    point = location_to_point(item.location)
    if point is None:
        continue

    # STRtree returns geometries in Shapely 1.x and indexes in Shapely 2.x.
    for candidate in area_index.query(point):
        polygon = areas[candidate] if isinstance(candidate, Integral) else candidate
        if polygon.covers(point):
            community = communities_by_polygon_id[id(polygon)]
            counts[community] = counts.get(community, 0) + 1
            break

# Save an explicit schema consumed by the API and map.
result = pandas.DataFrame(
    {
        'community_area': [
            feature['properties'].get(
                'community', feature['properties'].get('community_area', 'Unknown')
            ).upper()
            for feature in geojson['features']
        ]
    }
)
result['crime_count'] = result['community_area'].map(counts).fillna(0).astype(int)
result.to_csv(os.path.join('data', 'crime_by_community_area.csv'), index=False)
