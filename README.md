# geojson-utilities.js


## Description
Javascript utilities to alter geoJSON-objects

## Installation
### bower
`bower install https://github.com/FCOO/geojson-utilities.js.git --save`

## Usage
### `window.GeoJSON.normalize( {geoJSONObj} )`
Return geoJSONObj normalized into a FeatureCollection.
    
### `window.GeoJSON.flatten( {geoJSONObj} )`
Flatten MultiPoint, MultiPolygon, MultiLineString, and  GeometryCollection geometries in GeoJSON files into simple non-complex geometries.
    
### `window.GeoJSON.merge( []{geoJSONObject} )`
Merge a series of GeoJSON objects into one FeatureCollection containing all features in all files.  
The objects can be any valid GeoJSON root object, including FeatureCollection, Feature, and Geometry types.


## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/geojson-utilities.js/LICENSE).

Copyright (c) 2018 [FCOO](https://github.com/FCOO)

## Contact information

Niels Holt nho@fcoo.dk

##  
Code taken from https://github.com/tmcw/awesome-geojson
